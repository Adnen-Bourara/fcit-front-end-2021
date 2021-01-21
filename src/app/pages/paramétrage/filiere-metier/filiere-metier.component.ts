import { Component, OnInit } from '@angular/core';
import { FiliereMetierService } from './filiere-metier.service';

@Component({
  selector: 'ngx-filiere-metier',
  templateUrl: './filiere-metier.component.html',
  styleUrls: ['./filiere-metier.component.scss']
})
export class FiliereMetierComponent implements OnInit {

  constructor(private serviceFiliere:FiliereMetierService) { }
  source:any;
 async ngOnInit() {
  this.source= await this.serviceFiliere.getAll();
  }



  
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
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
      nomFiliere: {
        title: 'Filiere métier',
        type: 'string',
     
    },
  }
}


async onDeleteConfirm(event) {
  if (window.confirm('Are you sure you want to delete?')) {
    await this.serviceFiliere.deleteFiliere(event.data.id);
    event.confirm.resolve();
  } else {
    event.confirm.reject();
  }
}


async onCreateConfirm(event)
{
  this.serviceFiliere.addFiere(event.newData);
  console.log('3malt add');
  setTimeout(async () => {
this.source =  await this.serviceFiliere.getAll() }, 3000);
event.confirm.resolve(event.newData);
}


async onSaveConfirm(event) {
await this.serviceFiliere.editFiliere(event.newData);
event.confirm.resolve(event.newData);  
}



}
