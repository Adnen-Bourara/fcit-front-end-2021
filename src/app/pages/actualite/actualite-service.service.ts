import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { HttpClient } from '@angular/common/http';
import { Actualite } from './actualite';

@Injectable({
  providedIn: 'root'
})
export class ActualiteServiceService {
  url = PagesComponent.urlConfig+'actualite'
  constructor(protected httpclient : HttpClient) { }

  async GetActualiteById(id :Number)
     {
     return this.httpclient.get<Actualite>(this.url+'/'+id).toPromise();
     }
    
    async GetAllActualite()
     {
       return this.httpclient.get<Actualite[]>(this.url).toPromise();
     } 

    async AddActualite(actualite : Actualite)
     {
       return this.httpclient.post<Actualite>(this.url,actualite).toPromise();
     } 

    async EditActualite(actualite : Actualite)
     {
       return this.httpclient.put(this.url+'/'+ actualite.id , actualite).toPromise();
     } 

    async DeleteActualiteById(id :Number)
     {
       return this.httpclient.delete(this.url+'/'+id).toPromise();
     }

    uploadimage(id:number,uploadImageData:FormData)
     {
        return  this.httpclient.post(this.url+'/'+id+'/image/upload', uploadImageData, { observe: 'response' })
     .subscribe((response) => {
       if (response.status === 200) {
         console.log('Image uploaded successfully');
       } else {
         console.log('Image not uploaded successfully');
       }
     }
     );


 }

 async getimage(id:number)
 {
   return this.httpclient.get(this.url+'/'+id+'/image/get').toPromise();
 }


 async deleteImage(id:number)
 {
   return this.httpclient.delete(this.url+'/image/'+id).toPromise();
 }


}
