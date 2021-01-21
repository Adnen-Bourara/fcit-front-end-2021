import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { MotCle } from './mot-cle';

@Injectable({
  providedIn: 'root'
})
export class MotCleService {
  url = PagesComponent.urlConfig+'motcles'
  constructor(protected httpclient : HttpClient) { }

  async getAllMotCle()
  {
  return this.httpclient.get<MotCle[]>(this.url).toPromise();
  }

  async getmotCleById(id:number)
  {
    return this.httpclient.get<MotCle>(this.url+'/'+id).toPromise();
  }

  async addMotCle(motCle:MotCle)
  {
    return this.httpclient.post(this.url,motCle).toPromise();
  }

  async deleteMotCle(id:number)
  {
    return this.httpclient.delete(this.url+'/'+id).toPromise();
  }
  async editmotCle(motcle:MotCle)
  {
    return this.httpclient.put(this.url+'/'+motcle.id,motcle).toPromise();
  }

}
