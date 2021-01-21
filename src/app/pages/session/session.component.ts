import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { ModalSessionComponent } from './modal-session/modal-session.component';
import { SessionServiceService } from './session-service.service';
import { ShowSessionComponent } from './show-session/show-session.component';

@Component({
  selector: 'ngx-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  source: any;
  idFormateur: any;
  idFormation: any;

  constructor(private windowService: NbWindowService,
    private toastrService: NbToastrService,
    private sessionService: SessionServiceService) { }

  async ngOnInit() {
    localStorage.clear();
    this.source = await this.sessionService.GetAllSession();
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
      codeSession: {
        title: 'code',
        type: 'text',
      },
      typeSession:{
        title:'Type',
        type:'text',
        filter: {
          type: 'list',
          config: {
            selectText: 'Type',
            list: [
            { value: 'Synthése', title: 'Synthése' },
            { value: 'Séminaire', title: 'Séminaire' },
            { value: 'Stage pratique', title: 'Stage pratique' },
          ],
          },
        },
      },
      modeSession: {
        title: 'mode',
        type: 'text',
      },
    },
  };


  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalSessionComponent, { title: 'Ajouter une session' },
    );
  }


  onCostum(event) :any {
    if (event.action === 'editAction') {
   localStorage.removeItem('e');
   localStorage.removeItem('id');
   localStorage.setItem('id' , event.data.id);
   localStorage.setItem('e', '1');
   this.windowService.open(ModalSessionComponent, {title: 'Modifier cette session'});
   }
   if (event.action === 'showAction') {
     localStorage.removeItem('e');
     localStorage.removeItem('id');
     localStorage.setItem('id' , event.data.id);
     this.windowService.open(ShowSessionComponent, {title: 'Afficher les informations de cette session'});
     console.log('show');
   } 
 }


 async onDeleteConfirm(event) {
  if (window.confirm(`Vous etes sure de supprimer cette session`)) {
    event.confirm.resolve( await this.sessionService.DeleteSessionById(event.data.id),
    this.source.filter(p => p !== event.data),
    this.toastrService.warning("Succès","Session supprimée")
    );
  } else {
    event.confirm.reject();
  }
}





}
