import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { User } from "@shared/entities"
import { Profile, Picklists, PagingDataSource } from "@shared/models"

@Injectable({ providedIn: "root" })
export class StoreService {
    public profile$ = new BehaviorSubject<Profile>(null)
    get profile(): Profile { return this.profile$.value }

    public picklists$ = new BehaviorSubject<Picklists>(null)
    get picklists() { return this.picklists$.value }

    public users$ = new BehaviorSubject<User[]>(null)
    get users() { return this.users$.value }

    public clients$ = new BehaviorSubject<User[]>(null)
    get clients() { return this.clients$.value }

    public search$ = new BehaviorSubject<string>(null)

    public pdsItems$ = new BehaviorSubject<PagingDataSource>(null)
    get pdsItems() { return this.pdsItems$.value }
}
