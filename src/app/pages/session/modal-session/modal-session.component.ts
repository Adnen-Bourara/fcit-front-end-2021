import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { ClientService } from '../../client/client.service';
import { FormateurService } from '../../formateur/formateur.service';
import { FormationService } from '../../formation/formation-service.service';
import { Session } from '../session';
import { SessionServiceService } from '../session-service.service';

@Component({
  selector: 'ngx-modal-session',
  templateUrl: './modal-session.component.html',
  styleUrls: ['./modal-session.component.scss']
})
export class ModalSessionComponent implements OnInit {
  A: string;
  session: Session;
  idFormation: any;
  idFormateur: any;
  idClient: any;
  listeFormation = [];
  listeFormateur = [];
  listeClient = [];
  selectedFormation: any;
  selectedFormateur: any;
  selectedClient: any;

  constructor(private toastrService: NbToastrService,
    private router: Router,
    public windowRef: NbWindowRef,
    private sessionService: SessionServiceService,
    private formationService: FormationService,
    private formateurService: FormateurService,
    private clientService : ClientService) { }

  async ngOnInit() {

    let e = localStorage.getItem('e');
    this.session = new Session;
    this.listeFormation = await this.formationService.GetAllFormation();
    this.listeFormateur = await this.formateurService.getAllFormateur();
    this.listeClient = await this.clientService.GetAllClient();
    for (let index = 0; index < this.listeFormateur.length; index++) 
    {
      this.listeFormateur[index].nom = this.listeFormateur[index].nom + ' ' + this.listeFormateur[index].prenom;
    }
    this.idFormation = localStorage.getItem('idFormation');
    localStorage.removeItem('idFormation')
    if (this.idFormation != '0' && this.idFormation != 'null' && this.idFormation != null) 
    {
      this.selectedFormation = +this.idFormation;
      console.log(this.idFormation);
    }

    this.idFormateur = localStorage.getItem('idFormateur');
    localStorage.removeItem('idFormateur')
    if (this.idFormateur != '0' && this.idFormateur != 'null' && this.idFormateur != null) 
    {
      this.selectedFormateur = +this.idFormateur;
      console.log(this.idFormateur);
    }
  
    


    this.idClient = localStorage.getItem('idClient');
    localStorage.removeItem('idClient')
    if (this.idClient != '0' && this.idClient != 'null' && this.idClient != null) 
    {
      this.selectedClient = +this.idClient;
      console.log(this.idClient);
    }






    if (e === '0') {
      this.A = 'Ajouter';
    }
    if (e === '1') {
      this.A = 'Modifier';
      let id = localStorage.getItem('id');
      this.session = await this.sessionService.GetSessionById(+id);
      if (this.session.formateur == null)
      { this.selectedFormateur = null}
      else (this.selectedFormateur = this.session.formateur.id)
      this.selectedFormation = this.session.formation.id;
      this.selectedClient = this.session.client.id;
    }

  }


  fermer() {
    this.windowRef.close();
  }

  async onAddSession() {
    let e = localStorage.getItem('e');
    if (e === '0') {
      if(this.selectedFormateur == null)
      {this.selectedFormateur = -1}
      this.sessionService.AddSession(this.session, this.selectedFormation, this.selectedFormateur , this.selectedClient);
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/session']));
      this.toastrService.success("Succès", "Session ajoutée");
    }

    if (e === '1') {
      if(this.selectedFormateur == null)
      {this.selectedFormateur = -1}
      this.sessionService.EditSession(this.session, this.selectedFormation, this.selectedFormateur , +this.selectedClient);
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/session']));
      this.toastrService.success("Succès", "Session modifiée");
    }
  }



}
