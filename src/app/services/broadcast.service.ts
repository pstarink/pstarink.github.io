import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

interface BroadcastModel {
  key: any;
  value: any;
}

@Injectable({ providedIn: 'root' })
export class BroadcastService {
  private queue: Subject<BroadcastModel>;

  constructor() {
    this.queue = new Subject<BroadcastModel>();
  }

  broadcast(key: any, value: any = null) {
    this.queue.next({ key, value });
  }

  unsubscribe() {
    this.queue.complete();
  }

  listen<T>(key: any): Observable<T> {
    return this.queue.asObservable().pipe(
      filter((e) => e.key === key),
      map((e) => <T>e.value)
    );
  }
}
