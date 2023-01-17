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

  public callErrorEndpoint(): Observable<void> {
    return this.http.get<void>(`http://localhost:3333/error`);
  }

  public callHelloEndpoint(): Observable<void> {
    return this.http.get<void>(`http://localhost:3333/hello`);
  }

  public callFakeEndpoint(): Observable<void> {
    return this.http.get<void>(`http://localhost:3333/fake`);
  }

  public getBottles(): Observable<IBottle[]> {
    return this.http.get<IBottle[]>(`http://localhost:3333/bottles`);
  }

  public createBottle(): Observable<IBottle> {
    return this.http.post<IBottle>(`http://localhost:3333/bottles`, {
      brand: 'Example bottle',
      capacity: '1L',
    });
  }
}
