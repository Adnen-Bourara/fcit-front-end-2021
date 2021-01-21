import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { Index } from '.';

@Injectable({
  providedIn: 'root'
})
export class IndexationService {

  url = PagesComponent.urlConfig+'index'

  constructor(protected httpclient : HttpClient) { }

  async getindexByFormationId(id:number)
  {
    return this.httpclient.get<Index[]>(this.url+'/formation/'+id).toPromise();
  }

  async getindexByMotCleId(id:number)
  {
    return this.httpclient.get<Index[]>(this.url+'/motCle/'+id).toPromise();
  }

  async createIndex(idF:number,idM:number)
  {
    return this.httpclient.get(this.url+'/formation/'+idF+'/motCle/'+idM).toPromise();
  }

  async deleteIndex(id:number)
  {
    return this.httpclient.delete(this.url+'/'+id).toPromise();
  }
}
