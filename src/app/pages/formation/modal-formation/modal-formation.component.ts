import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef, NbToastrService } from '@nebular/theme';
import { FormationService } from '../formation-service.service';
import { Formation } from '../formation';
import { MotCleService } from '../../paramétrage/mot-cle/mot-cle.service';
import { Actualite } from '../../actualite/actualite';
import { IndexationService } from '../../paramétrage/mot-cle/indexation.service';
import { NbAuthSimpleInterceptor } from '@nebular/auth';
import { CatalogueService } from '../../paramétrage/catalogue/catalogue.service';
import { LiaisonFFService } from '../../paramétrage/filiere-metier/liaison-ff.service';
import { FiliereMetierService } from '../../paramétrage/filiere-metier/filiere-metier.service';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';



@Component({
  selector: 'ngx-modal-formation',
  templateUrl: './modal-formation.component.html',
  styleUrls: ['./modal-formation.component.scss']
})
export class ModalFormationComponent implements OnInit {
formation : Formation 
A : string 
selectedCatalogue:any;
listeMotsCle=[];
listeFiliere=[];
listeCatalogue=[];
selectedMotCle=[];
selectedFiliere=[];
getindexation=[];
getLiaisonFF=[];
listboucle=[];
listboucle2=[];
  constructor(
    private serviceformation : FormationService ,
    private router : Router , 
    public windowRef: NbWindowRef,
    private serviceMotCle: MotCleService,
    private serviceIndexation:IndexationService,
    private serviceCatalogue:CatalogueService,
    private serviceLiaisonFF:LiaisonFFService,
    private serviceFiliereMetier:FiliereMetierService,
    private toastrService:NbToastrService,) { }

  async ngOnInit() {
    let e = localStorage.getItem('e');
    this.formation = new Formation();
    this.listeMotsCle = await this.serviceMotCle.getAllMotCle();
    this.listeCatalogue = await this.serviceCatalogue.getAll();
    this.listeFiliere = await this.serviceFiliereMetier.getAll();
    this.onChange
   
    if (e === '0' ) {
      this.A = 'Ajouter';

    }
    if (e === '1') {
      this.A = 'Modifier';
      let id = localStorage.getItem('id');
     this.formation =  await this.serviceformation.GetFormationById(+id);
     this.selectedCatalogue = this.formation.catalogue.id;
     this.getindexation = await this.serviceIndexation.getindexByFormationId(this.formation.id);
     for (let i=0;i<=this.getindexation.length-1;i++)
     {
        this.listboucle[i]=this.getindexation[i].motCle.id;
     }
     this.selectedMotCle = this.listboucle;
     this.getLiaisonFF = await this.serviceLiaisonFF.getLiaisonByFormationId(this.formation.id);

     for (let i=0;i<=this.getLiaisonFF.length-1;i++)
     {
        this.listboucle2[i]=this.getLiaisonFF[i].filiereMetier.id;
     }
     this.selectedFiliere = this.listboucle2;
     console.log(this.selectedMotCle) ;
     console.log(this.formation);
     }

  }
  



 async onAddFormation()
{


    let e = localStorage.getItem('e');
      if (e === '0') 
       {
        console.log(this.formation); 
        
        this.formation = await this.serviceformation.AddFormation(this.formation,+this.selectedCatalogue);
        this.createliaisonAvecMotCLe(this.selectedMotCle,this.formation.id);
        this.createliaisonAvecFiliere(this.selectedFiliere,this.formation.id);
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/formation']));
        this.toastrService.success("Succès","Formation Ajoutée")
            
      }
      if( e === '1')
      {
        await this.serviceformation.EditFormation(this.formation,+this.selectedCatalogue);
        this.deleteAllliason(this.getindexation);
        this.deleteAllLiaisonFiliere(this.getLiaisonFF);
        this.createliaisonAvecMotCLe(this.selectedMotCle,this.formation.id);
        this.createliaisonAvecFiliere(this.selectedFiliere,this.formation.id);
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/formation']));
        this.toastrService.success("Succès","Formation modifiée");
      }


}



  fermer()  
     {
      this.windowRef.close();
     }


    createliaisonAvecMotCLe(listId:any[],idFormation:number)
    {
      for (let i=0;i<=listId.length-1;i++)
            {
              this.serviceIndexation.createIndex(idFormation,listId[i]);
            }
    }

    deleteAllliason(list:any[])
    {
      for (let i=0;i<=list.length-1;i++)
      {
        this.serviceIndexation.deleteIndex(list[i].id);
        console.log("delete index");
      }

    }


    
    createliaisonAvecFiliere(listId:any[],idFormation:number)
    {
      for (let i=0;i<=listId.length-1;i++)
            {
              this.serviceLiaisonFF.createLiaison(idFormation,listId[i]);
            }
    }

    deleteAllLiaisonFiliere(list:any[])
    {
      for (let i=0;i<=list.length-1;i++)
      {
        this.serviceLiaisonFF.deleteLiaison(list[i].id);
        console.log("delete index");
      }

    }


    public onChange( { editor }: ChangeEvent) {
      this.formation.descriptionFormation = editor.getData();
  }

  public Editor = DecoupledEditor;

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );

  

}

  













    

}
