import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../pages.component';
import { Ingenieur } from './ingenieur';

@Injectable({
  providedIn: 'root'
})
export class IngenieurService {
  url = PagesComponent.urlConfig+'IngPedago'

  constructor(protected httpclient : HttpClient) { }

  async getIngenieurByid(id:number)
  {
    return this.httpclient.get<Ingenieur>(this.url+'/'+id).toPromise(); 
  }

  async getAllIng()
  {
    return this.httpclient.get<Ingenieur[]>(this.url).toPromise();
  }

  async addIng(ingenieur:Ingenieur)
  {
    return this.httpclient.post<Ingenieur>(this.url,ingenieur).toPromise(); 
  }

  async deleteIng(id:number)
  {
    return this.httpclient.delete(this.url+'/'+id).toPromise(); 
  }

  async editIng(id:number,ingenieur:Ingenieur)
  {
    return this.httpclient.put(this.url+'/'+id,ingenieur).toPromise();
  }
  
}
