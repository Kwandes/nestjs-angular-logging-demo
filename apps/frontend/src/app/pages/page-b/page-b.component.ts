import { Component } from '@angular/core';
import * as Sentry from '@sentry/angular';
import { AppService } from '../../services/app.service';
import { SentryService } from '../../services/sentry.service';

@Component({
  selector: 'logging-demo-page-b',
  templateUrl: './page-b.component.html',
  styleUrls: ['./page-b.component.css'],
})
export class PageBComponent {
  constructor(
    private appService: AppService,
    private sentryService: SentryService
  ) {}

  unhandledError() {
    throw new Error('An unhandled error');
  }

  handledError() {
    this.sentryService.logError(new Error('A handled error'));
  }

  event() {
    Sentry.captureMessage('Normal event about something happening');
  }

  helloApi() {
    this.appService.callHelloEndpoint().subscribe({
      next: () => {
        this.sentryService.logEvent({
          message: 'Called the hello world endpoint',
          level: 'info',
        });
      },
      error: (error) => {
        this.sentryService.logError(error);
      },
    });
  }

  errorApi() {
    this.appService.callErrorEndpoint().subscribe({
      error: (error) => {
        this.sentryService.logError(error);
      },
    });
  }
  fakeApi() {
    this.appService.callFakeEndpoint().subscribe({
      error: (error) => {
        this.sentryService.logError(error);
      },
    });
  }
}
