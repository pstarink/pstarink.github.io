import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { environment } from "@env";
import { Container, User, ContainerModel, Lookup, Location } from "@shared/entities"
import { Profile } from "@shared/models"
import { map, Observable, of, tap } from "rxjs";
import * as _ from "lodash";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { PyramidService } from "@services";
import { StoreService } from "./store.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import jwt_decode from 'jwt-decode';
import { Picklists } from "@shared/models/picklists.model";
import { NGXLogger } from "ngx-logger";

@UntilDestroy()
@Injectable({ providedIn: "root" })
export class BizService {

  private profile: Profile
  public picklists: Picklists
  private users: User[] = null
  private containerDefs: ContainerModel[] = null

  barcodeChars = "0123456789" // abcdefghijkmnopqrstuvwxyz";
  barcodeLength = 6
  barcodeIndex = Math.pow(this.barcodeChars.length, this.barcodeLength - 1)

  api = environment.api;

  constructor(
    private http: HttpClient,
    public router: Router,
    private pyramid: PyramidService,
    private store: StoreService,
    private log: NGXLogger
  ) {
    this.log.trace("@BizService");

    this.store.profile$.pipe(untilDestroyed(this)).subscribe(profile => this.profile = profile)
    this.store.picklists$.pipe(untilDestroyed(this)).subscribe(picklists => this.picklists = picklists)
    this.store.users$.pipe(untilDestroyed(this)).subscribe(users => this.users = users)

    const profile = new Profile(JSON.parse(localStorage.getItem("profile")));
    this.setProfile(profile);
  }

  // #region AUTH -------------------------------------------------------------

  // load data after the profile has been set
  public async preloadData(profile: Profile): Promise<any> {
    return new Promise(async (resolve, reject) => {
      console.log("*preloadData")
      const calls = [
        this.pyramid.list("Lookups"),
        this.pyramid.list("Users"),
        this.processLookups()
      ]
      const [lookups, users, success] = await Promise.all(calls)
      const picklists = new Picklists(lookups as Lookup[])
      this.store.picklists$.next(picklists)
      this.store.users$.next(_.sortBy(users, "name"))
      resolve(true)
    })
  }

  tables: string[] = []
  columns: { [name: string]: string[] } = {}
  lookups: Lookup[]
  // get lookup id by (composite) key
  convert: { [key: number]: number }

  async processLookups(): Promise<boolean> {
    try {
      const calls = [
        this.pyramid.get("columns"),
        this.pyramid.list("Lookups"),
        this.pyramid.list("UnitScalings")
      ]
      const [columns, lookups, unitScalings] = await Promise.all(calls)
      this.lookups = lookups as Lookup[]
      this.tables = Object.keys(columns)
      this.convert = {}
      unitScalings.forEach(scaling => (this.convert[scaling.unitType] = scaling.multiplier))
      return true
    } catch {
      return false
    }
  }


  login(email, password): Observable<any> {
    this.log.trace(`*login`)
    const call = `${this.api}/users/login`
    return this.http.post(call, { email, password }).
      pipe(
        map((resp: any) => new Profile(resp)),
        map(async profile => { await this.setProfile(profile) })
      )
  }

  logout() {
    this.log.trace('*logout')
    localStorage.removeItem('profile')
    this.store.profile$.next(null)
    this.router.navigate(['auth/login'])
  }

  forgotPassword(email: string) {
    this.log.trace("*forgotPassword")
    // this.post(`auth/forgotPassword`, { email })
  }

  changePassword(model) {
    this.log.trace("*changePassword")
    // this.post(`auth/changePassword`, model)
  }

  updateUser(user: any): Promise<any> {
    const doc = _.pick(user, Profile.keys);
    return this.pyramid.put(`account/user`, doc);
  }

  loadUsers = async () => {
    const users = await this.pyramid.list<User>('Users')
    this.store.users$.next(users)
  }

  async setProfile(profile: Profile) {
    try {
      Object.assign(profile, jwt_decode(profile.token))
    } catch {
      console.log("Error decoding token: " + profile.token)
      return
    }
    console.log(`Setting profile for ${profile?.name || "nobody"}`)
    localStorage.setItem("profile", JSON.stringify(profile))
    await this.preloadData(profile)
    this.store.profile$.next(profile)
  }

  // #endregion

  reserveBarcode = async () => this.reserveBarcodes(1)

  // reserveBarcodes = (count: number = 1) => this.get<string>(`reserveBarcode/${count}`);
  async reserveBarcodes(count = 1): Promise<string> {
    const bc = await this.pyramid.readSetting("barcode")
    if (bc) {
      this.pyramid.saveSetting("barcode", this.toBarcode(this.fromBarcode(bc) + count))
    }
    return bc;
  }

  toBarcode(index: number): string {
    const len = this.barcodeChars.length;
    let bc = "";
    while (bc.length < this.barcodeLength) {
      const digit = index % len;
      index = Math.floor(index / len);
      bc = this.barcodeChars[digit] + bc;
    }
    return bc;
  }

  fromBarcode(bc: string): number {
    const len = this.barcodeChars.length;
    let index = 0;
    while (bc.length > 0) {
      index = index * len + this.barcodeChars.indexOf(bc[0]);
      bc = bc.substring(1);
    }
    return index;
  }

  async loadPicklists() {
    const lookups = await this.pyramid.list<Lookup>("Lookups")
    const picklists = new Picklists(lookups)
    this.store.picklists$.next(picklists)
  }

  async deleteLookup(lookup) {
    this.picklists.lookups
      .filter(lu => lu.parentId == lookup.id || lu.id == lookup.id)
      .forEach(lu => {
        this.pyramid.delete(`Lookups/${lu.id}`)
        console.log(`Deleting node ${lu.id}`)
      })
    this.loadPicklists()
  }

  /*
  activityType
  tasks: [
	  {
		  taskType
		  intent
	  }
  ]

  */

  async deleteLocation(location: Location) {
    this.pyramid.delete(`locations/${location.barcode}`)
  }

  // load container + wells + wellContents
  // scope: container, well, content
  async loadContainer(barcode: string, scope = "well") {
    return this.pyramid.get(`containers/${barcode}?scope=${scope}`)
  }

  async saveContainer(ctr: Container): Promise<any> {
    // return new Promise(async (resolve, reject) => {
    //   setTimeout(() => resolve(true), 1000)
    // })
    return new Promise(async (resolve, reject) => {
      try {
        if (ctr.id) {
          resolve(this.pyramid.put("containers", ctr))
        } else {
          const resp = await this.pyramid.post("containers", ctr)
          ctr.id = resp.id
          ctr.wells?.forEach(well => well.containerId = ctr.id)
        }
        const requests = ctr.wells?.map(well => this.pyramid.post("wells", well))
        console.log(`Well requests: ${requests.length}`)
        resolve(requests)
      } catch (e) {
        reject(e)
      }
    })
  }

  async loadStep(name: string) {
    return this.pyramid.get(`steps?name=${name}`)
  }

  async loadActivity(id: number) {
    return new Promise(async (resolve, reject) => {
      const activity: any = await this.pyramid.get(`activities?id=${id}`)
      const stepId = activity?.stepId
      if (!stepId) {
        reject(`Activity with id ${id} cannot be found`)
        return
      }
      const step = await this.pyramid.get(`steps/id=${stepId}`)
      if (!step) {
        reject(`Step ${stepId} cannot be found`)
        return
      }
      resolve({ step, activity })
    })
  }

  private handleError<T>(operation = "operation", result?: T) {
    // let msg = '';
    // if(error.error instanceof ErrorEvent) {
    //   // client side error
    //   msg = error.error.message;
    // } else {
    //   // server side error
    //   msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    // }
    // console.log(msg);
    // return throwError(msg);

    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // #endregion
}
