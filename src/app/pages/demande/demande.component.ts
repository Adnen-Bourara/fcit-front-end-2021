import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { DemandeService } from './demande.service';
import { ModalDemandeComponent } from './modal-demande/modal-demande.component';
import { ShowDemandeComponent } from './show-demande/show-demande.component';

@Component({
  selector: 'ngx-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss']
})
export class DemandeComponent implements OnInit {

  constructor(
    private demandeService :DemandeService,
    private windowService: NbWindowService,
    private toastrService : NbToastrService,
  ) { }
  idFormation:any;
  idDemandeur:any;
source:any;
  async ngOnInit() {
    this.idDemandeur = localStorage.getItem('idDemandeur');
    this.idFormation = localStorage.getItem('idFormation');
    localStorage.clear();
    if (this.idDemandeur==this.idFormation)
    {
      this.source = await this.demandeService.getAll();
    }
    if(this.idDemandeur=='0')
    {
      this.source = await this.demandeService.getDemandeByFormationId(+this.idFormation);
    }
    if(this.idFormation=='0')
    {
      this.source = await this.demandeService.getDemandeByDemandeurId(+this.idDemandeur);
    }
    
  }

  settings = {
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

      formation:{
        title: 'Formation',
        type: 'text',
        valuePrepareFunction: (value) =>{ return value.intituleFormation },
      },
      demandeur:{
        title: 'Demandeur',
        type: 'text',
        valuePrepareFunction: (value) =>{ return value.nom+' '+value.prenom },
      },
      etat: {
        title: 'Etat',
        type: 'text',
      },
      
    },
  };



  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    if (this.idDemandeur != '0' && this.idDemandeur != 'null' && this.idDemandeur != null)
    {
      localStorage.setItem('idDemandeur', this.idDemandeur);
      console.log(this.idDemandeur);
    }
    else if( this.idFormation!='0' && this.idFormation != 'null' && this.idFormation !=null )
    {
      localStorage.setItem('idFormation', this.idFormation);
      console.log(this.idFormation);
    }
    this.windowService.open(ModalDemandeComponent, {title: 'Ajouter une demande'},
      );     
  }



  onCostum(event) :any {
    if (event.action === 'editAction') {
   localStorage.removeItem('e');
   localStorage.removeItem('id');
   localStorage.setItem('id' , event.data.id);
   localStorage.setItem('e', '1');
   this.windowService.open(ModalDemandeComponent, {title: 'Modifier cette demande'});
   }
   if (event.action === 'showAction') {
     localStorage.removeItem('e');
     localStorage.removeItem('id');
     localStorage.setItem('id' , event.data.id);
     this.windowService.open(ShowDemandeComponent, {title: 'Afficher les informations de cette demande'});
     console.log('show');
   } 
 }

 async onDeleteConfirm(event) {
  if (window.confirm(`Vous etes sure de supprimer cette demande`)) {
    event.confirm.resolve( await this.demandeService.deleteDemande(event.data.id),
    this.source.filter(p => p !== event.data),
    this.toastrService.warning("Succès","Demande supprimée")
    );
  } else {
    event.confirm.reject();
  }
}


}