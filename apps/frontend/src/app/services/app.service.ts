import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  public callErrorEndpoint(): Observable<void> {
    return this.http.get<void>(`http://localhost:3333/error`);
  }

  public callHelloEndpoint(): Observable<void> {
    return this.http.get<void>(`http://localhost:3333/hello`);
  }

  public callFakeEndpoint(): Observable<void> {
    return this.http.get<void>(`http://localhost:3333/fake`);
  }
}
