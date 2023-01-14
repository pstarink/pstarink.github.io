import { APP_INITIALIZER, NgModule } from '@angular/core'
import { HashLocationStrategy, LocationStrategy } from '@angular/common'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AppLayoutModule } from './layout/app.layout.module'
import { JwtInterceptor, SharedModule } from './shared'
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger'
import { DialogService } from 'primeng/dynamicdialog'
import { NotifyService } from './components'
import { BizService } from './services'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgHttpLoaderModule } from 'ng-http-loader'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    AppLayoutModule,

    // NotifyModule,
    // AppCodeModule,
    SharedModule,

    LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      // trace debug info log warning error fatal
      colorScheme: ['green', 'teal', 'blue', 'gray', 'orange', 'red', 'darkred'],
      disableFileDetails: true,
      timestampFormat: "ss.SSS"
    }),
    NgHttpLoaderModule.forRoot()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => initializeAppData,
      deps: [BizService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

function initializeAppData(biz: BizService): () => Promise<any> {
  return () => new Promise((resolve) => {
    // pre-profile
  })
}
