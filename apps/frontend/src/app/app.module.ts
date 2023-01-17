import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler } from '@angular/core';
import * as Sentry from '@sentry/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { PageAComponent } from './pages/page-a/page-a.component';
import { PageBComponent } from './pages/page-b/page-b.component';
import { AppService } from './services/app.service';
import { SentryService } from './services/sentry.service';

@NgModule({
  declarations: [AppComponent, PageAComponent, PageBComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [
    AppService,
    SentryService,
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
        logErrors: true,
      }),
    },
    {
      provide: APP_INITIALIZER,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      useFactory: () => () => {},
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
