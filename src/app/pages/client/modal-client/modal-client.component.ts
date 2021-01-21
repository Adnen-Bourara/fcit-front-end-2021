import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { Client } from '../client';
import { ClientServiceService } from '../client-service.service';

@Component({
  selector: 'ngx-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.scss']
})
export class ModalClientComponent implements OnInit {
  A : string;
  client : Client;
  constructor(private toastrService:NbToastrService,
    private router : Router, 
    public windowRef: NbWindowRef,
    private clientService : ClientServiceService) { }

async ngOnInit(){ 
      let e = localStorage.getItem('e');
      this.client = new Client();
      if (e === '0' ) {
        this.A = 'Ajouter';
      
    
      }
      if (e === '1') {
        this.A = 'Modifier';
        let id = localStorage.getItem('id'); 
        this.client = await this.clientService.getClientById(+id)
      }
    }


fermer()
{
  this.windowRef.close();
}


async onAddClient()
{
  let e = localStorage.getItem('e');
  if (e === '0') 
    {
      this.clientService.saveClient(this.client)
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/client']));
      this.toastrService.success("Succès","Client ajouté") ;
    }

  if( e === '1')
    { 
      this.clientService.editClient(this.client)
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/client']));
      this.toastrService.success("Succès","Client modifié") ;
    }
}

}
