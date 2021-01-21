import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  url = PagesComponent.urlConfig+'client'; 
  constructor(protected httpclient : HttpClient) { }

  async getAllClient()
{
  return this.httpclient.get<Client[]>(this.url).toPromise();
}

async getClientById(id:number)
{
  return this.httpclient.get<Client>(this.url+'/'+id).toPromise();
}

async saveClient(client:Client)
{
  return this.httpclient.post(this.url,client).toPromise();
}

async editClient(client:Client)
{
  return this.httpclient.put(this.url+'/'+client.id,client).toPromise();
}

async deleteClient(id:number)
{
  return this.httpclient.delete(this.url+'/'+id).toPromise();
}


}
