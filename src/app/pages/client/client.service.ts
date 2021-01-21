import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url = PagesComponent.urlConfig +'client'

  constructor(protected httpclient: HttpClient) { }

  async GetClientId(id: Number) {
    return this.httpclient.get<Client>(this.url + '/' + id).toPromise();
  }

  async GetAllClient() {
    return this.httpclient.get<Client[]>(this.url).toPromise();
  }


  async DeleteClientId(id: Number) {
    return this.httpclient.delete(this.url + '/' + id).toPromise();
  }
}


