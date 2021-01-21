import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Support } from './support';
import { PagesComponent } from '../../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  url = PagesComponent.urlConfig+'support';
  
  constructor(protected httpclient : HttpClient) { }

  async getSupportById(id:number)
  {
    return this.httpclient.get<Support>(this.url+'/'+id).toPromise();
  }

  async getAll()
  {
    return this.httpclient.get<Support[]>(this.url).toPromise();
  }

  async addSupport(support:Support)
  {
    return this.httpclient.post(this.url,support).toPromise();
  }

  async deleteSupport(id:number)
  {
    return this.httpclient.delete(this.url+'/'+id).toPromise();
  }

  async editSupport(support:Support)
  {
    return this.httpclient.put(this.url+'/'+support.id,support).toPromise();
  }
}
