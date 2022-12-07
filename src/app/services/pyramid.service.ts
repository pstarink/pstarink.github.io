import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { catchError, map, tap } from "rxjs/operators";
import { lastValueFrom, Observable, of } from "rxjs";
import * as _ from "lodash";
import { UntilDestroy } from "@ngneat/until-destroy";

import { environment } from "@env";
import { Lookup } from "@shared/entities"
import { KeyValue, ApiResponse } from "@shared/models";
import { StoreService } from "./store.service";

@UntilDestroy()
@Injectable({ providedIn: "root" })
export class PyramidService {

  public searchResults = []

  private lookups: Lookup[] = null

  api = environment.api;

  httpHeader = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  }

  constructor(
    private http: HttpClient,
    public router: Router,
    public store: StoreService,
    private sanitizer: DomSanitizer
  ) {
    this.log("@PyramidService");
  }

  // #region HTTP HELPERS -----------------------------------------------------

  log(message) {
    console.log(message);
  }

  // get (read)
  get(endpoint: string): Promise<any> {
    const req = `${this.api}/${endpoint}`
    console.log(`get ${req}`)
    return lastValueFrom(this.http
      .get(req, this.httpHeader)
      .pipe(
        catchError(this.handleError(req)),
        tap(resp => JSON.stringify(resp, null, 2)))
    )
  }
  // map((resp: ApiResponse) => resp?.data)

  // post (create)
  post(endpoint, data = null): Promise<any> {
    const req = `${this.api}/${endpoint}`
    console.log(`post ${endpoint}`)
    return lastValueFrom(this.http
      .post(req, data, this.httpHeader)
      .pipe(
        catchError(this.handleError(req))
        // map((resp: ApiResponse) => resp?.data)
      ))
  }

  // put (replace)
  put<T>(endpoint, data): Promise<any> {
    const req = `${this.api}/${endpoint}`
    console.log(`put ${endpoint}`)
    return lastValueFrom(this.http
      .put<any>(req, data, this.httpHeader)
      .pipe(
        catchError(this.handleError<T>(req))
        // map((resp: ApiResponse) => resp?.data)
      ))
  }

  // patch (update)
  patch<T>(endpoint, id, data): Promise<any> {
    const req = `${this.api}/${endpoint}/${id}`
    console.log(`patch ${endpoint}`)
    return lastValueFrom(this.http
      .patch<any>(req, data, this.httpHeader)
      .pipe(
        catchError(this.handleError<T>(req))
        // map((resp: ApiResponse) => resp?.data)
      ))
  }

  // delete
  delete(endpoint): Promise<any> {
    const req = `${this.api}/${endpoint}`
    console.log(`delete ${endpoint}`)
    return lastValueFrom(this.http
      .delete(req, this.httpHeader)
      .pipe(
        catchError(this.handleError(req)),
        map((resp: ApiResponse) => resp?.data)
      ))
  }

  // #endregion

  // #region GENERAL ----------------------------------------------------------

  ping = () => this.get(`ping`);

  // #endregion

  // #region CRUD -------------------------------------------------------------

  tables = () => this.get(`tables`)

  tableColumns = (name: string) => this.get(`columns/${name}`)

  list =<T> (name: string): Promise<T[]> => this.get(`crud/${name}`)

  // #endregion

  // #region PICKLISTS --------------------------------------------------------

  // refreshPicklists(lookups: Lookup[] = null) {
  //   this.lookups = lookups || this.lookups
  //   if (this.lookups?.length > 0) {
  //     const pl = new Picklists(this.lookups)
  //     this.store.picklists$.next(pl)
  //   }
  // }

  // async loadPicklists(): Promise<void> {
  //   this.lookups = await this.list("Lookups")
  //   return this.refreshPicklists()
  // }

  // addLookup(lookup: Lookup) {
  //   if (this.lookups) {
  //     this.lookups.push(lookup);
  //     this.refreshPicklists();
  //   }
  // }

  // updateLookup(lookup: Lookup) {
  //   if (this.lookups) {
  //     const ref = this.lookups.find(lu => lu.id == lookup.id);
  //     if (ref) {
  //       Object.assign(ref, lookup);
  //       this.refreshPicklists();
  //     }
  //   }
  // }

  // removeLookup(lookup: Lookup) {
  //   if (this.lookups) {
  //     this.lookups.filter(lu => lu.parentId == lookup.id || lu.id == lookup.id).forEach(lu => this.delete(`lookups/${lu.id}`));
  //     this.lookups = this.lookups.filter(lu => lu.parentId != lookup.id && lu.id != lookup.id);
  //     this.refreshPicklists();
  //   }
  // }

  // listLookups = () => this.list(`Lookups`)

  // getLookup = (id) => this.get<Lookup>(`lookups/${id}`)

  // postLookup = (lookup: Lookup) => this.post(`lookups`, lookup)

  // putLookup = (lookup: Lookup) => this.put(`lookups/${lookup.id}`, lookup)

  // queryLookups = (field: string, term: string) => this.get<Lookup>(`lookup/?${field}=${term}`)

  // #endregion

  // #region LOCATIONS --------------------------------------------------------

  listLocations = () => this.list('locations')

  addLocation(location: Location) {
    // add location
  }

  // #endregion

  // #region CONTAINERS -------------------------------------------------------

  setContents = (contents) => this.post(`contents`, contents)
  createOperations = (operations) => this.post(`operations`, operations)

  // #endregion

  // #region SETTINGS

  listSettings = () => this.list('Settings')

  readSetting = (key: string) =>
    this.get(`settings/${key}`)
      .then(val => val?.value ?? null)

  saveSetting = (key: string, value: string) => this.post(`settings/${key}/${value}`)

  deleteSetting = (key: string) => this.delete(`settings/${key}`)

  // #endregion

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
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
