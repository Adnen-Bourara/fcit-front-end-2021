import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormateurService } from './formateur.service';
import { NbWindowService, NbToastrService } from '@nebular/theme';
import { ModalFormateurComponent } from './modal-formateur/modal-formateur.component';
import { ShowFormateurComponent } from './show-formateur/show-formateur.component';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';





@Component({
  selector: 'ngx-button-view',
  template:
  '<div class="container-btn">'+
  '<button nbButton status="primary" (click)="onClick()" >Validation</button>'+
  '</div>',

})
export class ButtonViewValidationComponent implements ViewCell, OnInit {
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
    localStorage.setItem('idFormateur', this.rowData.id);
    this.router.navigate(['/pages/validation/formateur']);
  }
}



@Component({
  selector: 'ngx-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.scss']
})
export class FormateurComponent implements OnInit {
  source : any;

  constructor(private formateurService:FormateurService,
    private windowService: NbWindowService,
    private toastrService : NbToastrService,
    ) { }

  async ngOnInit() {
    localStorage.clear();
    this.source = await this.formateurService.getAllFormateur();
  
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
      email: {
        title: 'Email',
        type: 'text',
      },
      fonction: {
        title: 'Fonction',
        type: 'text',
      },
      validation: {
        title: 'Validation',
        type: 'custom',
        renderComponent: ButtonViewValidationComponent,
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
    this.windowService.open(ModalFormateurComponent, {title: 'Ajouter un formateur'},
      );     
  }



  onCostum(event) :any {
    if (event.action === 'editAction') {
   localStorage.removeItem('e');
   localStorage.removeItem('id');
   localStorage.setItem('id' , event.data.id);
   localStorage.setItem('e', '1');
   this.windowService.open(ModalFormateurComponent, {title: 'Modifier les informations de ce formateur'});
   }
   if (event.action === 'showAction') {
     localStorage.removeItem('e');
     localStorage.removeItem('id');
     localStorage.setItem('id' , event.data.id);
     this.windowService.open(ShowFormateurComponent, {title: 'Afficher les informations de ce formateur'});
     console.log('show');
   } 
 }

 async onDeleteConfirm(event) {
  if (window.confirm(`Vous etes sure de supprimer ce formateur`)) {
    event.confirm.resolve( await this.formateurService.deleteFormateur(event.data.id),
    this.source.filter(p => p !== event.data),
    this.toastrService.warning("Succès","Formateur supprimé")
    );
  } else {
    event.confirm.reject();
  }
}




}
