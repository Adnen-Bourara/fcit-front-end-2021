import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SupportService } from './support.service';
import { Router } from '@angular/router';
import { ViewCell } from 'ng2-smart-table';
import { ModalSupportComponent } from './modal-support/modal-support.component';
import { NbWindowService } from '@nebular/theme';




@Component({
  selector: 'ngx-button-view',
  template:
  '<div class="container-btn">'+
  '<button nbButton status="primary" (click)="onClick()" >files</button>'+
  '</div>',

})
export class ButtonViewFilesComponent implements ViewCell, OnInit {
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
    localStorage.setItem('idS', this.rowData.id);
    this.router.navigate(['/pages/support/fichier']);
  }
}




@Component({
  selector: 'ngx-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  constructor(
      private router : Router,
      private supportService:SupportService,
      private windowService: NbWindowService) { }
  source:any;
  async ngOnInit() {
    this.source= await this.supportService.getAll();
  }


  settings = {
    mode: 'external',
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

    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        filter: true,
        addable: false,
        editable: false,
        sort:true,
        sortDirection:'desc',
        width: "3rem",
      },
      titre: {
        title: 'Titre',
        type: 'string',
      },
      date: {
        title:'Date',
        type: 'Date', 
      },
      fichier: {
        title: 'Fichier',
        type: 'custom',
        renderComponent: ButtonViewFilesComponent,
        filter: false,
        show:false,
        addable: false,
        editable: false,
      },
  }

  }



  async onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      await this.supportService.deleteSupport(event.data.id);
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      {  
      this.router.navigate(['/pages/formateur/settings']);
      });
    } else {
      event.confirm.reject();
    }
  }
  
  
  async create(event)
  {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalSupportComponent, {title: 'Ajouter un support'},
    );  
  
  }
  
  
  async modif(event) {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('id' , event.data.id);
    localStorage.setItem('e', '1');
    this.windowService.open(ModalSupportComponent, {title: 'Modifier les informations de ce support'});
  }


}
