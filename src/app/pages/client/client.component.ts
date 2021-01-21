import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';

import { ClientServiceService } from './client-service.service';
import { ModalClientComponent } from './modal-client/modal-client.component';
import { ShowClientComponent } from './show-client/show-client.component';

@Component({
  selector: 'ngx-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  source : any;
  constructor(private windowService: NbWindowService,
    private toastrService : NbToastrService,
    private clientService : ClientServiceService) { }

  async ngOnInit() {
    localStorage.clear();
    this.source = await this.clientService.getAllClient();
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
      typeClient:{
        title:'Type',
        type:'text',
        filter: {
          type: 'list',
          config: {
            selectText: 'Type',
            list: [
            { value: 'Personne', title: 'Personne' },
            { value: 'Société', title: 'Société' },
          ],
          },
        },
      },
      nomClient: {
        title: 'Nom',
        type: 'text',
      },
      telClient: {
        title: 'Telephone',
        type: 'text',
      },
      
    
    },
  }



  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalClientComponent, {title: 'Ajouter un client'},
      );     
  }


  onCostum(event) :any {
    if (event.action === 'editAction') {
   localStorage.removeItem('e');
   localStorage.removeItem('id');
   localStorage.setItem('id' , event.data.id);
   localStorage.setItem('e', '1');
   this.windowService.open(ModalClientComponent, {title: 'Modifier les informations de ce client'});
   }
   if (event.action === 'showAction') {
     localStorage.removeItem('e');
     localStorage.removeItem('id');
     localStorage.setItem('id' , event.data.id);
     this.windowService.open(ShowClientComponent, {title: 'Afficher les informations de ce client'});
     console.log('show');
   } 
 }





 async onDeleteConfirm(event) {
  if (window.confirm(`Vous etes sure de supprimer ce client`)) {
    event.confirm.resolve( await this.clientService.deleteClient(event.data.id),
    this.source.filter(p => p !== event.data),
    this.toastrService.warning("Succès","Client supprimé")
    );
  } else {
    event.confirm.reject();
  }
}






}
