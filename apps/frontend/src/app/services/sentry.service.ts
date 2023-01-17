import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Sentry from '@sentry/angular';

@Injectable({
  providedIn: 'root',
})
export class SentryService {
  logEvent(event: { message: string; level: Sentry.SeverityLevel }) {
    Sentry.captureEvent(event);
  }

  logError(error: unknown) {
    if (error instanceof HttpErrorResponse) {
      console.error(error);
      Sentry.captureEvent({
        message: `${error.url} - ${error.statusText}`,
        level: error.status >= 500 ? 'error' : 'warning',
        extra: { ResponseMessage: error.error.message },
      });
    } else {
      console.error(error);
      Sentry.captureException(error);
    }
    console.error(error);
    Sentry.captureException(error);
  }
}
