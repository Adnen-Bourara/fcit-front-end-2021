import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../../../pages.component';
import { Fichier } from './fichier';

@Injectable({
  providedIn: 'root',
})
export class FichierService {

  url = PagesComponent.urlConfig + 'support';
  url1 = PagesComponent.urlConfig + 'fichier';
  constructor(protected httpclient: HttpClient) { }

  async getFichierById(id: number)
  {
    return this.httpclient.get<Fichier>(this.url1 + '/' + id).toPromise();
  }

  async getAllFichier()
  {
    return this.httpclient.get<Fichier[]>(this.url1).toPromise();
  }

  async getFichierBySupport(id: number)
  {
    return this.httpclient.get<Fichier[]>(this.url + '/' + id + '/fichier').toPromise();
  }

  async addFichier(fichier: Fichier , id: number)
  {
    return this.httpclient.post(this.url + '/' + id + '/fichier', fichier).toPromise();
  }

  async deleteFichier(id: number)
  {
    return this.httpclient.delete(this.url1 + '/' + id).toPromise();
  }

  async editFichier(fichier: Fichier)
  {
    return this.httpclient.put(this.url1 + '/' + fichier.id, fichier).toPromise();
  }

  uploadFile(file: File , fileName: string)
  {
    const formData = new FormData();
    formData.append('file', file, fileName + '.' + file.name.split('.').pop());
    return this.httpclient.post('http://localhost:9099/uploadFile', formData);
  }

  async deleteFile(filename: string, type: string)
  {
    return this.httpclient.delete('http://localhost:9099/deleteFile/' + filename + '.' + type).toPromise();
  }



}
