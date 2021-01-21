import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { FormationService } from '../formation-service.service';
import { Formation } from '../formation';
import { MotCleService } from '../../paramétrage/mot-cle/mot-cle.service';
import { IndexationService } from '../../paramétrage/mot-cle/indexation.service';
import { CatalogueService } from '../../paramétrage/catalogue/catalogue.service';
import { LiaisonFFService } from '../../paramétrage/filiere-metier/liaison-ff.service';
import { FiliereMetierService } from '../../paramétrage/filiere-metier/filiere-metier.service';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

@Component({
  selector: 'ngx-show-formation',
  templateUrl: './show-formation.component.html',
  styleUrls: ['./show-formation.component.scss']
})
export class ShowFormationComponent implements OnInit {
formation : Formation;
ListeMotsCle=[];
selectedMotCle=[];
getindexation=[];
listboucle=[];
selectedCatalogue:any;
listeCatalogue=[];
selectedFiliere=[];
getLiaisonFF=[];
listeFiliere=[];
listboucle2=[];

  constructor(
    private windowRef: NbWindowRef,
    private serviceformation : FormationService,
    private serviceMotCle: MotCleService,
    private serviceCatalogue:CatalogueService,
    private serviceLiaisonFF:LiaisonFFService,
    private serviceFiliereMetier:FiliereMetierService,
    private serviceIndexation:IndexationService,) { }

 async ngOnInit(){
    this.formation = new Formation();
    let id = localStorage.getItem('id');
   this.listeCatalogue = await this.serviceCatalogue.getAll();
   this.formation = await  this.serviceformation.GetFormationById(+id);
   this.selectedCatalogue = this.formation.catalogue.id;
   this.ListeMotsCle = await this.serviceMotCle.getAllMotCle();
   this.listeFiliere = await this.serviceFiliereMetier.getAll();
   this.getLiaisonFF = await this.serviceLiaisonFF.getLiaisonByFormationId(this.formation.id);
   this.getindexation = await this.serviceIndexation.getindexByFormationId(this.formation.id);
     for (let i=0;i<=this.getindexation.length-1;i++)
     {
        this.listboucle[i]=this.getindexation[i].motCle.id;
     }
     this.selectedMotCle = this.listboucle;
     for (let i=0;i<=this.getLiaisonFF.length-1;i++)
     {
        this.listboucle2[i]=this.getLiaisonFF[i].filiereMetier.id;
     }
     this.selectedFiliere = this.listboucle2;
  }

  fermer()
  {
    this.windowRef.close();
  }

  

}
