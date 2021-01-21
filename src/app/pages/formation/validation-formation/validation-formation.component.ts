import { Component, OnInit } from '@angular/core';
import { ModalValidationComponent } from '../../validation/modal-validation/modal-validation.component';
import { ShowValidationComponent } from '../../validation/show-validation/show-validation.component';
import { FormateurService } from '../../formateur/formateur.service';
import { ValidationService } from '../../validation/validation.service';
import { NbWindowService, NbToastrService } from '@nebular/theme';
import { Formateur } from '../../formateur/formateur';
import { Formation } from '../formation';
import { FormationService } from '../formation-service.service';

@Component({
  selector: 'ngx-validation-formation',
  templateUrl: './validation-formation.component.html',
  styleUrls: ['./validation-formation.component.scss']
})
export class ValidationFormationComponent implements OnInit {

  constructor(
    private formationService:FormationService,
    private validationService:ValidationService,
    private windowService: NbWindowService,
    private toastrService : NbToastrService,) { }
source:any;
idFormateur:any;
idFormation:any;
idIng:any;
idSupport:any;
A:any;
formation= new Formation();
 async ngOnInit() {
   this.idFormation=localStorage.getItem('idFormation');
   this.formation= await this.formationService.GetFormationById(+this.idFormation);
   this.A=this.formation.intituleFormation;
    this.source = await this.validationService.getValidationByFormation(this.idFormation);



  }

  settings = {
    noDataMessage:"vide",
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 8,
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
  
      custom: [
        {
          name: 'editAction',
          title: '<i class="nb-edit" title="Edit"></i>',
        },
        {
          name: 'showAction',
          title: '<i class="nb-sunny" title="Show"></i>',
        },
      ],
    },
 
    columns: {
      formation: {
        title: 'Formation',
        type: 'text',
        valuePrepareFunction: (value) =>{ return value.intituleFormation },
         },
      formateur: {
        title: 'Formateur',
        type: 'number',
        valuePrepareFunction: (value) =>{ return value.nom+' '+value.prenom },
     
      },
      date:{
        title:'date',
        type:'text',
      },
      decision:{
        title:'Décision',
        type:'text',
        filter: {
          type: 'list',
          config: {
            selectText: 'Décision',
            list: [
            { value: 'accepté', title: 'accepté' },
            { value: 'Refus', title: 'Refusé' },
            { value: 'Accepté avec modification', title: 'Accepté avec modification' },
          ],
          },
        },
      }
    
    },
  }


  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalValidationComponent, {title: 'Ajouter une validation'},
      );     
  }



  onCostum(event) :any {
    if (event.action === 'editAction') {
   localStorage.removeItem('e');
   localStorage.removeItem('id');
   localStorage.setItem('id' , event.data.id);
   localStorage.setItem('e', '1');
   this.windowService.open(ModalValidationComponent, {title: 'Modifier les informations de cette validation'});
   }
   if (event.action === 'showAction') {
     localStorage.removeItem('e');
     localStorage.removeItem('id');
     localStorage.setItem('id' , event.data.id);
     this.windowService.open(ShowValidationComponent, {title: 'Afficher les informations de cette validation'});
     console.log('show');
   } 
 }

 async onDeleteConfirm(event) {
  if (window.confirm(`Vous etes sure de supprimer ce fichier`)) {
    event.confirm.resolve( await this.validationService.deleteValidation(event.data.id),
    this.source.filter(p => p !== event.data),
    this.toastrService.warning("Succès","Fichier supprimé")
    );
  } else {
    event.confirm.reject();
  }
}

}
