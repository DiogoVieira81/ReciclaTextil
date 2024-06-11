import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _http:HttpClient) { }
  sendMessage(body) {
    return this._http.post(‘http://localhost:3000/formulario', body);
    }
}
