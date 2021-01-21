import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { IngenieurService } from './ingenieur.service';
import { ModalIngenieurComponent } from './modal-ingenieur/modal-ingenieur.component';
import { ShowIngenieurComponent } from './show-ingenieur/show-ingenieur.component';

@Component({
  selector: 'ngx-ing-pedago',
  templateUrl: './ing-pedago.component.html',
  styleUrls: ['./ing-pedago.component.scss']
})
export class IngPedagoComponent implements OnInit {

  constructor(
    private IngService:IngenieurService,
    private windowService: NbWindowService,
    private toastrService : NbToastrService,
  ) { }
source:any;
  async ngOnInit() {
    this.source=await this.IngService.getAllIng();
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
      nom: {
        title: 'Nom',
        type: 'text',
      },
      prenom: {
        title: 'Prenom',
        type: 'text',
      },
      tel: {
        title: 'Tel',
        type: 'text',
        width:'100px',
      },
      email: {
        title: 'Email',
        type: 'text',
      },
     
    },
  }




  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalIngenieurComponent, {title: 'Ajouter un ingénieur'},
      );     
  }



  onCostum(event) :any {
    if (event.action === 'editAction') {
   localStorage.removeItem('e');
   localStorage.removeItem('id');
   localStorage.setItem('id' , event.data.id);
   localStorage.setItem('e', '1');
   this.windowService.open(ModalIngenieurComponent, {title: 'Modifier les informations de cet ingénieur'});
   }
   if (event.action === 'showAction') {
     localStorage.removeItem('e');
     localStorage.removeItem('id');
     localStorage.setItem('id' , event.data.id);
     this.windowService.open(ShowIngenieurComponent, {title: 'Afficher les informations de cet ingénieur'});
     console.log('show');
   } 
 }

 async onDeleteConfirm(event) {
  if (window.confirm(`Vous etes sure de supprimer cet ingénieur`)) {
    event.confirm.resolve( await this.IngService.deleteIng(event.data.id),
    this.source.filter(p => p !== event.data),
    this.toastrService.warning("Succès","Ingénieur supprimé")
    );
  } else {
    event.confirm.reject();
  }
}




}





