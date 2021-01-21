import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { Demandeur } from './demandeur';

@Injectable({
  providedIn: 'root'
})
export class DemandeurService {
  url = PagesComponent.urlConfig+'demandeur'; 
  constructor(protected httpclient : HttpClient) { }


async getAll()
{
  return this.httpclient.get<Demandeur[]>(this.url).toPromise();
}

async getDemandeurById(id:number)
{
  return this.httpclient.get<Demandeur>(this.url+'/'+id).toPromise();
}

async saveDemandeur(demandeur:Demandeur)
{
  return this.httpclient.post(this.url,demandeur).toPromise();
}

async editDemandeur(demandeur:Demandeur)
{
  return this.httpclient.put(this.url+'/'+demandeur.id,demandeur).toPromise();
}

async deleteDemandeur(id:number)
{
  return this.httpclient.delete(this.url+'/'+id).toPromise();
}

}
