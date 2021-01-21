import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { Demandeur } from '../demandeur';
import { DemandeurService } from '../demandeur.service';

@Component({
  selector: 'ngx-show-demandeur',
  templateUrl: './show-demandeur.component.html',
  styleUrls: ['./show-demandeur.component.scss']
})
export class ShowDemandeurComponent implements OnInit {
  demandeur:Demandeur;
  constructor(private demandeurService:DemandeurService, 
    public windowRef: NbWindowRef,) { }

 async ngOnInit() {
    this.demandeur = new Demandeur();
    let id = localStorage.getItem('id'); 
    this.demandeur = await this.demandeurService.getDemandeurById(+id);
  }


  fermer()
  {
    this.windowRef.close();
  }
  

}
