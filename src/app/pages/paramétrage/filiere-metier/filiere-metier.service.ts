import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../pages.component';
import { FiliereMetier } from './filiere-metier';

@Injectable({
  providedIn: 'root'
})
export class FiliereMetierService {
  url = PagesComponent.urlConfig+'filiereMetiers'

  constructor(protected httpclient : HttpClient) { }

  async getFiliereById(id:number)
  {
    return this.httpclient.get<FiliereMetier>(this.url+'/'+id).toPromise();
  }

  async getAll()
  {
    return this.httpclient.get<FiliereMetier[]>(this.url).toPromise();
  }

  async addFiere(filiereMetier:FiliereMetier)
  {
    return this.httpclient.post(this.url,filiereMetier).toPromise();
  }

  async deleteFiliere(id:number)
  {
    return this.httpclient.delete(this.url+'/'+id).toPromise();
  }

  async editFiliere(filiereMetier:FiliereMetier)
  {
    return this.httpclient.put<FiliereMetier>(this.url+'/'+filiereMetier.id,filiereMetier).toPromise();
  }
}
