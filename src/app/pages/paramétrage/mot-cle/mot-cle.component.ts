import { Component, OnInit } from '@angular/core';
import { MotCleService } from './mot-cle.service';

@Component({
  selector: 'ngx-mot-cle',
  templateUrl: './mot-cle.component.html',
  styleUrls: ['./mot-cle.component.scss']
})
export class MotCleComponent implements OnInit {

  constructor(private serviceMotCle:MotCleService) { }
source:any;
  async ngOnInit() {
    this.source= await this.serviceMotCle.getAllMotCle();
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
      motcle: {
        title: 'Mot cle',
        type: 'string',
     
    },
  }
}


async onDeleteConfirm(event) {
  if (window.confirm('Are you sure you want to delete?')) {
    await this.serviceMotCle.deleteMotCle(event.data.id);
    event.confirm.resolve();
  } else {
    event.confirm.reject();
  }
}


async onCreateConfirm(event)
{
  this.serviceMotCle.addMotCle(event.newData);
  setTimeout(async () => {
this.source =  await this.serviceMotCle.getAllMotCle() }, 3000);
event.confirm.resolve(event.newData);
}


async onSaveConfirm(event) {
await this.serviceMotCle.editmotCle(event.newData);
event.confirm.resolve(event.newData);  
}



}
