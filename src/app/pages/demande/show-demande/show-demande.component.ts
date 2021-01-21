import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { ClientService } from '../../client/client.service';
import { DemandeurService } from '../../demandeur/demandeur.service';
import { FormationService } from '../../formation/formation-service.service';
import { Demande } from '../demande';
import { DemandeService } from '../demande.service';

@Component({
  selector: 'ngx-show-demande',
  templateUrl: './show-demande.component.html',
  styleUrls: ['./show-demande.component.scss']
})
export class ShowDemandeComponent implements OnInit {

  constructor(  private demandeService:DemandeService,
    private formationService:FormationService,
    private demandeurService:DemandeurService,
    private toastrService:NbToastrService,
    private router : Router, 
    public windowRef: NbWindowRef,
    private clientService : ClientService) { }
    
    demande:any;
    listeFormation=[];
    listeClient=[];
    selectedFormation:any;
    listeDemandeur=[];
    selectedDemandeur:any;
    selectedClient:any;
 async ngOnInit(){
    this.demande = new Demande();
    this.listeFormation= await this.formationService.GetAllFormation();
    this.listeClient = await this.clientService.GetAllClient();
    this.listeDemandeur = await this.demandeurService.getAll();
    for (let index = 0; index < this.listeDemandeur.length; index++)
    {
      this.listeDemandeur[index].nom =  this.listeDemandeur[index].nom + ' ' + this.listeDemandeur[index].prenom; 
    }
    let id = localStorage.getItem('id'); 
      this.demande = await this.demandeService.getDemandeById(+id);
      if (this.demande.client == null)
      { this.selectedClient = null}
      else (this.selectedClient = this.demande.client.id)
      this.demande.date = new Date(this.demande.date);
      this.demande.dateDebPrevue = new Date(this.demande.dateDebPrevue);
      this.selectedDemandeur = this.demande.demandeur.id;
      this.selectedFormation = this.demande.formation.id;
  }

  fermer()
  {
    this.windowRef.close();
  }

}
