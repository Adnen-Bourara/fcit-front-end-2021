import { Component, OnInit } from '@angular/core';
import { CatalogueService } from './catalogue.service';


@Component({
  selector: 'ngx-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  constructor(private serviceCatalogue:CatalogueService) { }
source:any;
 async ngOnInit() {
this.source= await this.serviceCatalogue.getAll();
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
      nomCatalogue: {
        title: 'Catalogue',
        type: 'string',
    },

    alaUne: {
      title: 'A la une',
      editor: {
        type: 'list',
        config: {
          selectText: 'Select',
          list: [
            { value: 'true', title: 'true' },
            { value: 'false', title: 'false' },
          ],
        },
      },
      type: 'boolean',
    },




  }
}


async onDeleteConfirm(event) {
  if (window.confirm('Are you sure you want to delete?')) {
    await this.serviceCatalogue.deleteCatalogue(event.data.id);
    event.confirm.resolve();
  } else {
    event.confirm.reject();
  }
}


async onCreateConfirm(event)
{
  this.serviceCatalogue.addCatalogue(event.newData);
  console.log('3malt add');
  setTimeout(async () => {
this.source =  await this.serviceCatalogue.getAll() }, 3000);
event.confirm.resolve(event.newData);
}


async onSaveConfirm(event) {
await this.serviceCatalogue.editCatalogue(event.newData);
event.confirm.resolve(event.newData);  
}




}
