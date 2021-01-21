import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { LiaisonFF } from './liaison-ff';

@Injectable({
  providedIn: 'root'
})
export class LiaisonFFService {
  url = PagesComponent.urlConfig+'liaison'
  constructor(protected httpclient : HttpClient) { }

  async getLiaisonByFormationId(id:number)
  {
    return this.httpclient.get<LiaisonFF[]>(this.url+'/formation/'+id).toPromise();
  }

  async getLiaisonByFiliereId(id:number)
  {
    return this.httpclient.get<LiaisonFF[]>(this.url+'/filiere/'+id).toPromise();
  }

  async createLiaison(idF:number,idM:number)
  {
    return this.httpclient.get(this.url+'/formation/'+idF+'/filiere/'+idM).toPromise();
  }

  async deleteLiaison(id:number)
  {
    return this.httpclient.delete(this.url+'/'+id).toPromise();
  }
}
