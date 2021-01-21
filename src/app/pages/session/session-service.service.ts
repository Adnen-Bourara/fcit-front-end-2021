import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { Session } from './session';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {
  url = PagesComponent.urlConfig +'session'

  constructor(protected httpclient: HttpClient) { }

  async GetSessionById(id: Number) {
    return this.httpclient.get<Session>(this.url + '/' + id).toPromise();
  }

  async GetAllSession() {
    return this.httpclient.get<Session[]>(this.url).toPromise();
  }

  async AddSession(session: Session,idF:number, idFm : number , idCl : number) {
    console.log("add session")
    return this.httpclient.post<Session>(this.url+"/formation/"+idF+"/formateur/"+idFm+"/client/"+idCl, session).toPromise();
  }

  async EditSession(session: Session , idF:number , idFm : number , idCl : number) {
    return this.httpclient.put(this.url +'/'+ session.id+'/formation/'+idF+"/formateur/"+idFm+"/client/"+idCl, session).toPromise();
  }

  async DeleteSessionById(id: Number) {
    return this.httpclient.delete(this.url + '/' + id).toPromise();
  }
}
