import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormationService } from './formation-service.service';
import { NbWindowService, NbToastrService } from '@nebular/theme';
import { ModalFormationComponent } from './modal-formation/modal-formation.component';
import { ShowFormationComponent } from './show-formation/show-formation.component';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';





@Component({
  selector: 'ngx-button-view',
  template:
  '<div class="container-btn">'+
  '<button nbButton status="warning" (click)="onClick()" >Demande</button>'+
  '</div>',

})
export class ButtonViewDemande1Component implements ViewCell, OnInit {
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
    localStorage.setItem('idDemandeur','0');
    localStorage.setItem('idFormation', this.rowData.id);
    this.router.navigate(['/pages/demande']);
  }
}




@Component({
  selector: 'ngx-button-view',
  template:
  '<div class="container-btn">'+
  '<button nbButton status="primary" (click)="onClick()" >Validation</button>'+
  '</div>',

})
export class ButtonViewValidation2Component implements ViewCell, OnInit {
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
    localStorage.setItem('idFormation', this.rowData.id);
    this.router.navigate(['/pages/validation/formation']);
  }
}








@Component({
  selector: 'ngx-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {
 source : any 

  constructor(private serviceformation : FormationService,
    private windowService: NbWindowService,
    private toastrService : NbToastrService, ) { }

  async ngOnInit() {
    localStorage.clear();
    this.source = await this.serviceformation.GetAllFormation();
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
      codeFormation: {
        title: 'Code',
        type: 'text',
      },
      intituleFormation: {
        title: 'Intitulé',
        type: 'text',
      },
      categorieFormation : {
        title: 'Catégorie',
        type: 'text',
      },
      validation: {
        title: 'Validation',
        type: 'custom',
        renderComponent: ButtonViewValidation2Component,
        filter: false,
        show:false,
        addable: false,
        editable: false,
      },

      demande: {
        title: 'Demande',
        type: 'custom',
        renderComponent: ButtonViewDemande1Component,
        filter: false,
        show:false,
        addable: false,
        editable: false,
      },
    
    },
  };



  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalFormationComponent, {title: 'Ajouter une formation'},
      );     
  }



  onCostum(event) :any {
    if (event.action === 'editAction') {
   localStorage.removeItem('e');
   localStorage.removeItem('id');
   localStorage.setItem('id' , event.data.id);
   localStorage.setItem('e', '1');
   this.windowService.open(ModalFormationComponent, {title: 'Modifier cette formation'});
   }
   if (event.action === 'showAction') {
     localStorage.removeItem('e');
     localStorage.removeItem('id');
     localStorage.setItem('id' , event.data.id);
     this.windowService.open(ShowFormationComponent, {title: 'Afficher les informations de cette formation'});
     console.log('show');
   } 
 }

 async onDeleteConfirm(event) {
  if (window.confirm(`Vous etes sure de supprimer cette formation`)) {
    event.confirm.resolve( await this.serviceformation.DeleteFormationById(event.data.id),
    this.source.filter(p => p !== event.data),
    this.toastrService.warning("Succès","Formation supprimée")
    );
  } else {
    event.confirm.reject();
  }
}


}


