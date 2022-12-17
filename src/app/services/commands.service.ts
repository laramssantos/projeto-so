import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  constructor(private http: HttpClient) {
  }

  public getCpuInfo(){
    return this.http.get('http://localhost:8000/processador');
  }

  public getMemInfo(){
    return this.http.get('http://localhost:8000/memoria');
  }

  public getDiskInfo(){
    return this.http.get('http://localhost:8000/disco');
  }

  public getSystemInfo(){
    return this.http.get('http://localhost:8000/sistema');
  }
  
}
