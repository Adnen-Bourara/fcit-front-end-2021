import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { DemandeurService } from './demandeur.service';
import { ModalDemandeurComponent } from './modal-demandeur/modal-demandeur.component';
import { ShowDemandeurComponent } from './show-demandeur/show-demandeur.component';




@Component({
  selector: 'ngx-button-view',
  template:
  '<div class="container-btn">'+
  '<button nbButton status="warning" (click)="onClick()" >Demande</button>'+
  '</div>',

})
export class ButtonViewDemandeComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
    
  }
  constructor(private router: Router) {
  }
  onClick() {
    localStorage.setItem('idDemandeur', this.rowData.id);
    localStorage.setItem('idFormation', '0');
    this.router.navigate(['/pages/demande']);
  }
}




@Component({
  selector: 'ngx-demandeur',
  templateUrl: './demandeur.component.html',
  styleUrls: ['./demandeur.component.scss']
})
export class DemandeurComponent implements OnInit {
  source : any;

  constructor( private demandeurService :DemandeurService,
    private windowService: NbWindowService,
    private toastrService : NbToastrService,) { }

  async ngOnInit() {
    localStorage.clear();
    this.source = await this.demandeurService.getAll();
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
        width:'150px'
      },
      prenom: {
        title: 'Prenom',
        type: 'text',
      },
      mail: {
        title: 'Email',
        type: 'text',
      },
      tel: {
        title: 'Num tel',
        type: 'text',
      },

      demande: {
        title: 'Demande',
        type: 'custom',
        renderComponent: ButtonViewDemandeComponent,
        filter: false,
        show:false,
        addable: false,
        editable: false,
      },

    
    },
  }




  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalDemandeurComponent, {title: 'Ajouter un demandeur'},
      );     
  }



  onCostum(event) :any {
    if (event.action === 'editAction') {
   localStorage.removeItem('e');
   localStorage.removeItem('id');
   localStorage.setItem('id' , event.data.id);
   localStorage.setItem('e', '1');
   this.windowService.open(ModalDemandeurComponent, {title: 'Modifier les informations de ce demandeur'});
   }
   if (event.action === 'showAction') {
     localStorage.removeItem('e');
     localStorage.removeItem('id');
     localStorage.setItem('id' , event.data.id);
     this.windowService.open(ShowDemandeurComponent, {title: 'Afficher les informations de ce demandeur'});
     console.log('show');
   } 
 }

 async onDeleteConfirm(event) {
  if (window.confirm(`Vous etes sure de supprimer ce demandeur`)) {
    event.confirm.resolve( await this.demandeurService.deleteDemandeur(event.data.id),
    this.source.filter(p => p !== event.data),
    this.toastrService.warning("Succès","Demandeur supprimé")
    );
  } else {
    event.confirm.reject();
  }
}




}
