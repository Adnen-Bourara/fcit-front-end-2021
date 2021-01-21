import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { ClientService } from '../../client/client.service';
import { DemandeurService } from '../../demandeur/demandeur.service';
import { FormationService } from '../../formation/formation-service.service';
import { Demande } from '../demande';
import { DemandeService } from '../demande.service';

@Component({
  selector: 'ngx-modal-demande',
  templateUrl: './modal-demande.component.html',
  styleUrls: ['./modal-demande.component.scss']
})
export class ModalDemandeComponent implements OnInit {

  constructor( 
    private demandeService:DemandeService,
    private formationService:FormationService,
    private demandeurService:DemandeurService,
    private toastrService:NbToastrService,
    private router : Router, 
    public windowRef: NbWindowRef,
    private clientService : ClientService) { }

    demande:any;
    A:any;
    idFormation:any;
    idDemandeur:any;
    idClient: any;
    listeFormation=[];
    selectedFormation:any;
    listeDemandeur=[];
    listeClient=[];
    selectedClient:any;
    selectedDemandeur:any;
 async ngOnInit() {

let e = localStorage.getItem('e');
this.demande = new Demande();
this.listeFormation= await this.formationService.GetAllFormation();
this.listeClient = await this.clientService.GetAllClient();
this.listeDemandeur = await this.demandeurService.getAll();
for (let index = 0; index < this.listeDemandeur.length; index++)
{
  this.listeDemandeur[index].nom =  this.listeDemandeur[index].nom + ' ' + this.listeDemandeur[index].prenom; 
}

this.idFormation = localStorage.getItem('idFormation');
localStorage.removeItem('idFormation')

this.idDemandeur = localStorage.getItem('idDemandeur');
localStorage.removeItem('idDemandeur')

this.idClient = localStorage.getItem('idClient');
localStorage.removeItem('idClient')

if( this.idFormation!='0' && this.idFormation != 'null' && this.idFormation !=null )
{
  this.selectedFormation= +this.idFormation;
  console.log(this.idFormation);
}
if(this.idDemandeur != '0' && this.idDemandeur != 'null' && this.idDemandeur != null)
{
  this.selectedDemandeur= +this.idDemandeur;
  console.log(this.idDemandeur);
}
if (this.idClient != '0' && this.idClient != 'null' && this.idClient != null) 
{
  this.selectedClient = +this.idClient;
  console.log(this.idClient);
}

    if (e === '0' ) {
      this.A = 'Ajouter';
    
  
    }
    if (e === '1') {
      this.A = 'Modifier';
      let id = localStorage.getItem('id'); 
      this.demande = await this.demandeService.getDemandeById(+id);
      if (this.demande.client == null)
      { this.selectedClient = null}
      else (this.selectedClient = this.demande.client.id)
      console.log(this.demande);
      this.demande.date = new Date(this.demande.date);
      this.demande.dateDebPrevue = new Date(this.demande.dateDebPrevue);
      this.selectedDemandeur = this.demande.demandeur.id;
      this.selectedFormation = this.demande.formation.id;
    }

  }

  fermer()
  {
    this.windowRef.close();
  }

  onAddDemande()
  {
    let e = localStorage.getItem('e');
    if (e === '0') 
      { if(this.selectedClient == null)
        {this.selectedClient = -1}
        this.demandeService.addDemande(this.demande,this.selectedDemandeur,this.selectedFormation ,this.selectedClient)
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/demande']));
        this.toastrService.success("Succès","Demande ajoutée") ;
      }
  
    if( e === '1')
      { if(this.selectedClient == null)
        {this.selectedClient = -1}
        this.demandeService.editDemande(this.demande,this.selectedDemandeur,this.selectedFormation, this.selectedClient);
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/demande']));
        this.toastrService.success("Succès","Demande modifiée") ;
      }
  }
  
}
