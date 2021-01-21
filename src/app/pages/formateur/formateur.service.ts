import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../pages.component';
import { Formateur } from './formateur';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {
  url = PagesComponent.urlConfig+'formateur'

  constructor(protected httpclient : HttpClient) { }

  async getFormateurByid(id:number)
  {
    return this.httpclient.get<Formateur>(this.url+'/'+id).toPromise();
  }

  async getAllFormateur()
  {
    return this.httpclient.get<Formateur[]>(this.url).toPromise();
  }

  async saveFormateur(formateur:Formateur)
  {
    return this.httpclient.post<Formateur>(this.url,formateur).toPromise();
  } 

  async editFormateur(formateur:Formateur)
  {
    return this.httpclient.put(this.url+'/'+formateur.id,formateur).toPromise();
  }

  async deleteFormateur(id:number)
  {
    return this.httpclient.delete(this.url+'/'+id).toPromise();
  }
  
}
