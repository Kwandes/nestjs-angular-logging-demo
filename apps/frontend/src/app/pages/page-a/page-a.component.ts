import { Component } from '@angular/core';
import * as Sentry from '@sentry/angular';
import { AppService } from '../../services/app.service';
import { SentryService } from '../../services/sentry.service';

@Component({
  selector: 'logging-demo-page-a',
  templateUrl: './page-a.component.html',
  styleUrls: ['./page-a.component.css'],
})
export class PageAComponent {
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
    console.log('Capturing a normal message');
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

  getBottles() {
    this.appService.getBottles().subscribe({
      next: (response) => {
        console.log('bottles', response);
      },
    });
  }

  createBottle() {
    this.appService.createBottle().subscribe({
      next: (response) => {
        console.log('created bottle', response);
      },
    });
  }
}
