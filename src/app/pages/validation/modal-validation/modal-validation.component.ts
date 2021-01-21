import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { Validation } from '../validation';
import { ValidationService } from '../validation.service';
import { FormateurService } from '../../formateur/formateur.service';
import { FormationService } from '../../formation/formation-service.service';
import { SupportService } from '../../paramétrage/parametrage-formateur/support/support.service';
import { IngenieurService } from '../../ing-pedago/ingenieur.service';

@Component({
  selector: 'ngx-modal-validation',
  templateUrl: './modal-validation.component.html',
  styleUrls: ['./modal-validation.component.scss']
})
export class ModalValidationComponent implements OnInit {

  constructor(
    private validationService:ValidationService,
    private formateurService:FormateurService,
    private formationService:FormationService,
    private supportService:SupportService,
    private ingService:IngenieurService,
    private toastrService:NbToastrService,
    private router : Router, 
    public windowRef: NbWindowRef,) { }

  A:any;
  validation=new Validation();
  listeFormateur=[];
  listeFormation=[];
  listeSupport=[];
  listeIngenieur=[];
  selectedFormateur:any;
  selectedFormation:any;
  selectedSupport:any;
  selectedIngenieur:any;

  async ngOnInit(){
    let e = localStorage.getItem('e');
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



    if (e === '0' ) {
      this.A = 'Ajouter';
      let idFormateur = localStorage.getItem('idFormateur');
      let idFormation = localStorage.getItem('idFormation');

      if(idFormateur!=null)
      { 
        this.selectedFormateur= +idFormateur;
      }

      if(idFormation!=null)
      {
        this.selectedFormation= +idFormation;
      }




     


    }
    if (e === '1') {
      this.A = 'Modifier';
      let id = localStorage.getItem('id'); 
      this.validation = await this.validationService.getValidationById(+id);
      this.validation.date= new Date(this.validation.date);
      this.selectedFormateur= this.validation.formateur.id;
      this.selectedFormation= this.validation.formation.id;
      this.selectedSupport= this.validation.support.id;
      this.selectedIngenieur= this.validation.ingpedago.id;

    }
  }

  fermer()
  {
    this.windowRef.close();
  }

  onAddValidation()
  {
    let e = localStorage.getItem('e');
    if (e === '0') 
    {
      this.validationService.saveValidation(this.selectedFormateur,this.selectedFormation,this.selectedIngenieur,this.selectedSupport,this.validation);
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        {  
        this.router.navigate(['/pages/validation']);
        this.router.navigate(['/pages/validation']);
        });
        this.toastrService.success("Succès","Validation crée") ;
     

      }

    if( e === '1')
      { 
        
        this.validationService.editValidation(this.selectedFormateur,this.selectedFormation,this.selectedIngenieur,this.selectedSupport,this.validation);
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        {  
          this.router.navigate(['/pages/validation']);
          this.router.navigate(['/pages/validation']);
        });
        this.toastrService.success("Succès","Validation modifié");
 

      }
}


}
