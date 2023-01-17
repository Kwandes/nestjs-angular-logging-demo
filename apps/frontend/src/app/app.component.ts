import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'logging-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public router: Router) {}

  gotoPageA() {
    this.router.navigate(['/page-a']);
  }

  gotoPageB() {
    this.router.navigate(['/page-b']);
  }
}
