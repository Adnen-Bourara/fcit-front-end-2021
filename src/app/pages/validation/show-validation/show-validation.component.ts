import { Component, OnInit } from '@angular/core';
import { Validation } from '../validation';
import { NbWindowRef, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { IngenieurService } from '../../ing-pedago/ingenieur.service';
import { SupportService } from '../../paramétrage/parametrage-formateur/support/support.service';
import { FormationService } from '../../formation/formation-service.service';
import { FormateurService } from '../../formateur/formateur.service';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'ngx-show-validation',
  templateUrl: './show-validation.component.html',
  styleUrls: ['./show-validation.component.scss']
})
export class ShowValidationComponent implements OnInit {

  constructor(
    private validationService:ValidationService,
    private formateurService:FormateurService,
    private formationService:FormationService,
    private supportService:SupportService,
    private ingService:IngenieurService,
    private toastrService:NbToastrService,
    private router : Router, 
    public windowRef: NbWindowRef,
  ) { }
validation= new Validation();
listeFormateur=[];
  listeFormation=[];
  listeSupport=[];
  listeIngenieur=[];
  selectedFormateur:any;
  selectedFormation:any;
  selectedSupport:any;
  selectedIngenieur:any;
 async ngOnInit() {

    this.listeFormateur = await this.formateurService.getAllFormateur();
    for (let index = 0; index < this.listeFormateur.length; index++) {
      this.listeFormateur[index].nom =  this.listeFormateur[index].nom + ' ' + this.listeFormateur[index].prenom; 
    }
    this.listeFormation = await this.formationService.GetAllFormation();

    this.listeIngenieur = await this.ingService.getAllIng();
    for (let index = 0; index < this.listeIngenieur.length; index++) {
      this.listeIngenieur[index].nom =  this.listeIngenieur[index].nom + ' ' + this.listeIngenieur[index].prenom; 
    }
    this.listeSupport = await this.supportService.getAll();

    let id = localStorage.getItem('id'); 
    this.validation = await this.validationService.getValidationById(+id);
    this.validation.date= new Date(this.validation.date);
    this.selectedFormateur= this.validation.formateur.id;
    this.selectedFormation= this.validation.formation.id;
    this.selectedSupport= this.validation.support.id;
    this.selectedIngenieur= this.validation.ingpedago.id;

  }
  fermer()
  {
    this.windowRef.close();
  }
  
}
