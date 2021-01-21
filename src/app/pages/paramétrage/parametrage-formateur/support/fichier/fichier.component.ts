import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { FichierService } from './fichier.service';
import { SupportService } from '../support.service';
import { Support } from '../support';
import { ModalFichierComponent } from './modal-fichier/modal-fichier.component';
import { ShowFichierComponent } from './show-fichier/show-fichier.component';



@Component({
  selector: 'ngx-fichier',
  templateUrl: './fichier.component.html',
  styleUrls: ['./fichier.component.scss']
})
export class FichierComponent implements OnInit {

  constructor( 
    private supportService: SupportService,
    private fichierService: FichierService,
    private windowService: NbWindowService,
    private toastrService : NbToastrService,
    ) { }
source:any
Nom:String;
ids:any;
support:Support;
 async ngOnInit(){
    this.ids = localStorage.getItem('idS');
    this.source = await this.fichierService.getFichierBySupport(+this.ids);
    this.support = await this.supportService.getSupportById(+this.ids);
    this.Nom=this.support.titre;
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
      type: {
        title: 'Type',
        type: 'text',
      },
      taille: {
        title: 'Taille',
        type: 'number',
      },
    
    },
  }


  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalFichierComponent, {title: 'Ajouter un fichier'},
      );     
  }



  onCostum(event) :any {
    if (event.action === 'editAction') {
   localStorage.removeItem('e');
   localStorage.removeItem('id');
   localStorage.setItem('id' , event.data.id);
   localStorage.setItem('e', '1');
   this.windowService.open(ModalFichierComponent, {title: 'Modifier les informations de ce fichier'});
   }
   if (event.action === 'showAction') {
     localStorage.removeItem('e');
     localStorage.removeItem('id');
     localStorage.setItem('id' , event.data.id);
     this.windowService.open(ShowFichierComponent, {title: 'Afficher les informations de ce fichier'});
     console.log('show');
   } 
 }

 async onDeleteConfirm(event) {
  if (window.confirm(`Vous etes sure de supprimer ce fichier`)) {
    event.confirm.resolve( await this.fichierService.deleteFichier(event.data.id),
    this.source.filter(p => p !== event.data),
    this.toastrService.warning("Succès","Fichier supprimé")
    );
  } else {
    event.confirm.reject();
  }
}

}
