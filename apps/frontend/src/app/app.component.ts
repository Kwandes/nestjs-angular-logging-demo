import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Message } from '@logging-demo/api-interfaces';
import * as Sentry from '@sentry/angular';

@Component({
  selector: 'logging-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}

  errorA() {
    throw new Error('A custom error');
  }

  event() {
    Sentry.captureMessage('A fun message / event');
  }
}
