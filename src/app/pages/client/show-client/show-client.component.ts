import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { Client } from '../client';
import { ClientServiceService } from '../client-service.service';

@Component({
  selector: 'ngx-show-client',
  templateUrl: './show-client.component.html',
  styleUrls: ['./show-client.component.scss']
})
export class ShowClientComponent implements OnInit {
  client : Client;
  constructor(public windowRef: NbWindowRef ,
    private clientService : ClientServiceService) { }

  async ngOnInit() {
    this.client = new Client()
    let id = localStorage.getItem('id'); 
    this.client = await this.clientService.getClientById(+id)
  }

  fermer()
  {
    this.windowRef.close();
  }

}
