import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { Demande } from './demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  url = PagesComponent.urlConfig+'demande'; 
  constructor(protected httpclient : HttpClient) { }

  async getAll()
  {
    return this.httpclient.get<Demande[]>(this.url).toPromise();
  }

  async getDemandeById(id:Number)
  {
    return this.httpclient.get<Demande>(this.url+'/'+id).toPromise();
  }

  async getDemandeByDemandeurId(id:number)
  {
    return this.httpclient.get<Demande[]>(this.url+'/demandeur/'+id).toPromise();
  }

  async getDemandeByFormationId(id:number)
  {
    return this.httpclient.get<Demande[]>(this.url+'/formation/'+id).toPromise();
  }

  async addDemande(demande:Demande,idD:number,idF:number,idC:number)
  {
    return this.httpclient.post(this.url+'/demandeur/'+idD+'/formation/'+idF+'/client/'+idC+idF,demande).toPromise();
  }

  async editDemande(demande:Demande,idD:number,idF:number,idC:number)
  {
    return this.httpclient.put(this.url+'/'+demande.id+'/demandeur/'+idD+'/formation/'+idF+'/client/'+idC,demande).toPromise();
  }

  async deleteDemande(id:number)
  {
    return this.httpclient.delete(this.url+'/'+id).toPromise();
  }


}
