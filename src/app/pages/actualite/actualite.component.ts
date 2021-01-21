import { Component, OnInit } from '@angular/core';
import { ActualiteServiceService } from './actualite-service.service';
import { Actualite } from './actualite';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { ModalActualiteComponent } from './modal-actualite/modal-actualite.component';
import { ShowActualiteComponent } from './show-actualite/show-actualite.component';
import { id } from '@swimlane/ngx-charts';

@Component({
  selector: 'ngx-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.scss']
})
export class ActualiteComponent implements OnInit {
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  actualite : Actualite
  res:any;
  source : any
  constructor(private serviceactualite : ActualiteServiceService,
    private windowService: NbWindowService,
    private toastrService : NbToastrService,) { }

 async  ngOnInit(){
    this.source = await this.serviceactualite.GetAllActualite()
  }

  settings = {
  
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
      titre: {
        title: 'titre',
        type: 'text',
      },
      description: {
        title: 'description',
        type: 'text',
      },
    },
  };

  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalActualiteComponent, {title: 'Ajouter une actualité'},
      );     
  }

  onCostum(event) :any {
    if (event.action === 'editAction') {
   localStorage.removeItem('e');
   localStorage.removeItem('id');
   localStorage.setItem('id' , event.data.id);
   localStorage.setItem('e', '1');
   this.windowService.open(ModalActualiteComponent, {title: 'Modifier cette actualité'});
   }
   if (event.action === 'showAction') {
     localStorage.removeItem('e');
     localStorage.removeItem('id');
     localStorage.setItem('id' , event.data.id);
     this.windowService.open(ShowActualiteComponent, {title: 'Afficher les informations de cette actualité'});
     console.log('show');
   } 
 }

 async onDeleteConfirm(event) {
  if (window.confirm(`Vous etes sure de supprimer cette formation`)) {
    event.confirm.resolve( await this.serviceactualite.DeleteActualiteById(event.data.id),
    this.source.filter(p => p !== event.data),
    this.toastrService.warning("Succès","Formation supprimée")
    );
  } else {
    event.confirm.reject();
  }
}


}