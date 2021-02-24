import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { FormateurService } from '../formateur.service';
import { Formateur } from '../formateur';

@Component({
  selector: 'ngx-show-formateur',
  templateUrl: './show-formateur.component.html',
  styleUrls: ['./show-formateur.component.scss']
})
export class ShowFormateurComponent implements OnInit {
  formateur:Formateur;
  sourceImage:any;
  constructor( public windowRef: NbWindowRef,
    private formateurService:FormateurService,) { }

 async ngOnInit(){
    let id = localStorage.getItem('id');
    this.formateur= new Formateur();
    this.formateur= await this.formateurService.getFormateurByid(+id);
    this.sourceImage= this.formateur.photo;
  }



  fermer()
  {
    this.windowRef.close();
  }

  download()
  {
    window.open(this.formateur.cv, "_blank");
  }


}
