import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { Catalogue } from './catalogue';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  url = PagesComponent.urlConfig+'catalogues'

  constructor(protected httpclient : HttpClient) { }

async getCatalogueById(id:number)
{
  return this.httpclient.get<Catalogue>(this.url+'/'+id).toPromise();
}

async getAll()
{
  return this.httpclient.get<Catalogue[]>(this.url).toPromise();
}

async addCatalogue(catalogue:Catalogue)
{
  return this.httpclient.post(this.url,catalogue).toPromise();
}

async deleteCatalogue(id:number)
{
  return this.httpclient.delete(this.url+'/'+id).toPromise();
}

async editCatalogue(catalogue:Catalogue)
{
  return this.httpclient.put(this.url+'/'+catalogue.id,catalogue).toPromise();
}

}
