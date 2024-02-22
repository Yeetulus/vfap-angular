import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = '/api/';
  //private baseUrl = '/api/';
  private accessTokenName = 'access_token';
  private refreshTokenName = 'refresh_token';
  constructor(private http: HttpClient) {}

  private createHeaders(requiresAuthentication: boolean, token?:string): HttpHeaders {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    if (requiresAuthentication && token) {
      const authToken = localStorage.getItem(token);
      if(authToken){
        headers = headers.set("Authorization", `Bearer ${authToken}`);
      }
    }
    return headers;
  }

  private handleCustomError(
    error: HttpErrorResponse,
    errorCallback?: (error: HttpErrorResponse, statusCode: number) => void
  ): Observable<never> {
    if (errorCallback) {
      const statusCode = error.status || 500;
      errorCallback(error, statusCode);
    }
    return throwError(() =>error);
  }

  public get<T>(
    endpoint: string,
    requiresAuthentication: boolean = false,
    errorCallback?: (error: HttpErrorResponse, statusCode: number) => Observable<T>
  ): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    let headers= this.createHeaders(requiresAuthentication, this.accessTokenName);

    return this.http.get<T>(url, { headers }).pipe(
      catchError((error: HttpErrorResponse) => this.handleCustomError(error, errorCallback))
    );
  }

  public post<T>(
    endpoint: string,
    data: any,
    requiresAuthentication: boolean = false,
    successCallback?: (response: T) => void,
    errorCallback?: (error: HttpErrorResponse, statusCode: number) => void
  ): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    let headers = this.createHeaders(requiresAuthentication, this.accessTokenName);
    return this.http.post<T>(url, data, { headers }).pipe(
      catchError((error: HttpErrorResponse) => this.handleCustomError(error, errorCallback)),
      tap((response: T) => {
        if (successCallback) {
          successCallback(response);
        }
      })
    );

  }

  public refreshToken<T>(
    endpoint: string,
    errorCallback?: (error: HttpErrorResponse, statusCode: number) => Observable<T>
  ): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    let headers = this.createHeaders(true, this.refreshTokenName);

    return this.http.post<T>(url, { headers }).pipe(
      catchError((error: HttpErrorResponse) => this.handleCustomError(error, errorCallback))
    );
  }

}
