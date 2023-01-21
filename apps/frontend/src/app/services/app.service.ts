import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IBottle {
  bottleId: string;
  brand: string;
  capacity: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}
  apiUrl = 'http://localhost:3333';

  public callErrorEndpoint(): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/error`);
  }

  public callHelloEndpoint(): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/hello`);
  }

  public callFakeEndpoint(): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/fake`);
  }

  public getBottles(): Observable<IBottle[]> {
    return this.http.get<IBottle[]>(`${this.apiUrl}/bottles`);
  }

  public createBottle(): Observable<IBottle> {
    return this.http.post<IBottle>(`${this.apiUrl}/bottles`, {
      brand: 'Example bottle',
      capacity: '1L',
    });
  }
}
