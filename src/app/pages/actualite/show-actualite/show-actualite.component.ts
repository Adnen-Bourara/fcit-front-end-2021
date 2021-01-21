import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { ActualiteServiceService } from '../actualite-service.service';
import { Actualite } from '../actualite';

@Component({
  selector: 'ngx-show-actualite',
  templateUrl: './show-actualite.component.html',
  styleUrls: ['./show-actualite.component.scss']
})
export class ShowActualiteComponent implements OnInit {
  actualite : Actualite
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  res:any;

  constructor(private windowRef: NbWindowRef,
              private serviceactualite : ActualiteServiceService) { }

  async ngOnInit() {
    this.actualite = new Actualite();
    let id = localStorage.getItem('id');
    this.actualite = await this.serviceactualite.GetActualiteById(+id)
    this.res = await this.serviceactualite.getimage(this.actualite.id);
    this.retrieveResonse = this.res;
    this.base64Data = this.retrieveResonse.picByte;
    this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;

  }



  fermer()
  {
    this.windowRef.close();
  }
}
