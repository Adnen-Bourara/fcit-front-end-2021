import { Component, OnInit } from '@angular/core';
import { FichierService } from '../fichier.service';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { Fichier } from '../fichier';

@Component({
  selector: 'ngx-show-fichier',
  templateUrl: './show-fichier.component.html',
  styleUrls: ['./show-fichier.component.scss']
})
export class ShowFichierComponent implements OnInit {
  fichier:Fichier;
  id:any;
  lienFichier:any;
  constructor( private fichierService:FichierService,
    private toastrService:NbToastrService,
    private router : Router,
    public windowRef: NbWindowRef,) { }

 async  ngOnInit() {
this.fichier = new Fichier();
this.id = localStorage.getItem('id');
this.fichier= await this.fichierService.getFichierById(+this.id);
console.log(this.fichier);
this.lienFichier =this.fichier.url;
  }


  fermer()
  {
    this.windowRef.close();
  }

download()
{

  window.open(this.fichier.url, "_blank");
}


}
