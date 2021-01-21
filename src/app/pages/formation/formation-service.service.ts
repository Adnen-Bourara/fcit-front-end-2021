import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { HttpClient } from '@angular/common/http';
import { Formation } from './formation';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  url = PagesComponent.urlConfig+'formation'
  url1 = PagesComponent.urlConfig+'catalogue'
  
  constructor(protected httpclient : HttpClient){}


    async GetFormationById(idFormation :Number)
     {
     return this.httpclient.get<Formation>(this.url+'/'+idFormation).toPromise();
     }

     async GetFormationByCode(code :String)
     {
     return this.httpclient.get<Formation>(this.url+'/code/'+code).toPromise();
     }

     async getFormationByCatalogueId(id:number)
     {
       return  this.httpclient.get<Formation[]>(this.url1+'/'+id+'/formation').toPromise();
     }
    
    async GetAllFormation()
     {
       return this.httpclient.get<Formation[]>(this.url).toPromise();
     } 

    async AddFormation(foramtion : Formation,id:number)
     {
       return this.httpclient.post<Formation>(this.url1+'/'+id+'/formation',foramtion).toPromise();
     } 

    async EditFormation(formation : Formation,id:number)
     {
       return this.httpclient.put(this.url1+'/'+id+"/formation/"+formation.id, formation).toPromise();
     } 

    async DeleteFormationById(idFormation :Number)
     {
       return this.httpclient.delete(this.url+'/'+idFormation).toPromise();
     }


}

