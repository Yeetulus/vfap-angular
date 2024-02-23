import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
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

  public get<T>(
    endpoint: string,
    params?: { [param: string]: any },
    requiresAuthentication: boolean = false,
    successCallback?: (response: T) => void,
    errorCallback?: (error: HttpErrorResponse, statusCode: number) => void
  ): Observable<T> {

    const url = `${this.baseUrl}${endpoint}`;
    let httpHeaders= this.createHeaders(requiresAuthentication, this.accessTokenName);
    let httpParams = this.createHttpParams(params);

    return this.http.get<T>(url, { params: httpParams, headers: httpHeaders }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error occurred: ', error);
        return this.handleCustomError(error, errorCallback);
      }),
      tap((response: T) => {
        if (successCallback) {
          successCallback(response);
        }
      })
    );
  }

  public post<T>(
    endpoint: string,
    data?: any,
    params?: { [param: string]: any },
    requiresAuthentication: boolean = false,
    successCallback?: (response: T) => void,
    errorCallback?: (error: HttpErrorResponse, statusCode: number) => void
  ): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    let httpParams = this.createHttpParams(params);
    let httpHeaders = this.createHeaders(requiresAuthentication, this.accessTokenName);
    return this.http.post<T>(url, data, { headers: httpHeaders, params: httpParams}).pipe(
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

  private createHttpParams(params: { [p: string]: any } | undefined) {
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const value = params[key];
          httpParams = httpParams.append(key, Array.isArray(value) ? value.join(',') : value);
        }
      }
    }
    return httpParams;
  }

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
}
