import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '@env'
import { Profile } from '@shared/models/profile.model'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  // profile: Profile
  constructor() {
    // we cannot subscribe to profile$ because that may not be in time for bootLoad to call the api
    // shared.profile$.pipe(untilDestroyed(this)).subscribe(profile => this.profile = profile)
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const profile = new Profile(JSON.parse(localStorage.getItem("profile")))
    if (profile === null) {
      console.log('JWT interceptor: No profile')
    }
    const isLoggedIn = profile?.token
    const isApi = request.url.startsWith(environment.api)
    if (isLoggedIn && isApi) {
      request = request.clone({
        setHeaders: {
          authorization: profile.token
        }
      })
    }
    return next.handle(request)
  }
}
