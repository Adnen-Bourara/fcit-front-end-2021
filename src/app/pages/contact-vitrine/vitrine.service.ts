import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { Vitrine } from './vitrine';

@Injectable({
  providedIn: 'root'
})
export class VitrineService {
  url = PagesComponent.urlConfig+'vitrine';
  constructor(protected httpclient : HttpClient) { }


async getVitrine()
{
  return this.httpclient.get<Vitrine>(this.url).toPromise();
}

async saveVitrine(vitrine:Vitrine)
{
  return this.httpclient.post<Vitrine>(this.url,vitrine).toPromise();
}


}
