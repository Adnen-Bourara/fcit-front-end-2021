import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { HttpClient } from '@angular/common/http';
import { Validation } from './validation';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  url = PagesComponent.urlConfig+'validation';
  constructor(protected httpclient : HttpClient) { }

  async getValidationById(id:number)
  {
return this.httpclient.get<Validation>(this.url+'/'+id).toPromise();
  }
  async getValidationByFormation(id:number)
  {
return this.httpclient.get<Validation>(this.url+'/formation/'+id).toPromise();
  }
  async getValidationByFormateur(id:number)
  {
    return this.httpclient.get<Validation>(this.url+'/formateur/'+id).toPromise();
  }
  async getValidationByIngenieur(id:number)
  {
    return this.httpclient.get<Validation>(this.url+'/ingpedago/'+id).toPromise();
  }
  async getValidationBySupport(id:number)
  {
    return this.httpclient.get<Validation>(this.url+'/support/'+id).toPromise();
  }
  async getAllValidation()
  {
    return this.httpclient.get<Validation>(this.url).toPromise();
  }
  async saveValidation(idformateur:number,idFormation:number,idIng:number,idSupport:number,validation:Validation)
  {
  return this.httpclient.post(this.url+'/formateur/'+idformateur+'/formation/'+idFormation+'/ingpedago/'+idIng+'/support/'+idSupport,validation).toPromise();
  }

  async editValidation(idformateur:number,idFormation:number,idIng:number,idSupport:number,validation:Validation)
  {
  return this.httpclient.put(this.url+'/formateur/'+idformateur+'/formation/'+idFormation+'/ingpedago/'+idIng+'/support/'+idSupport,validation).toPromise();
  }

  async deleteValidation(id:number)
  {
    return this.httpclient.delete(this.url+'/'+id);
  }

}
