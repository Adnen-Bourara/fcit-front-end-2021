import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { Demandeur } from '../demandeur';
import { DemandeurService } from '../demandeur.service';

@Component({
  selector: 'ngx-modal-demandeur',
  templateUrl: './modal-demandeur.component.html',
  styleUrls: ['./modal-demandeur.component.scss']
})
export class ModalDemandeurComponent implements OnInit {
  A : string;
  demandeur:Demandeur;
  constructor(private demandeurService:DemandeurService,
    private toastrService:NbToastrService,
    private router : Router, 
    public windowRef: NbWindowRef,) { }

 async ngOnInit(){ 
  let e = localStorage.getItem('e');
  this.demandeur = new Demandeur();
  if (e === '0' ) {
    this.A = 'Ajouter';
  

  }
  if (e === '1') {
    this.A = 'Modifier';
    let id = localStorage.getItem('id'); 
    this.demandeur = await this.demandeurService.getDemandeurById(+id);

  }
}

fermer()
{
  this.windowRef.close();
}


async onAddDemandeur()
{
  let e = localStorage.getItem('e');
  if (e === '0') 
    {
      this.demandeurService.saveDemandeur(this.demandeur);
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/demandeur']));
      this.toastrService.success("Succès","Demandeur ajouté") ;
    }

  if( e === '1')
    { 
      this.demandeurService.editDemandeur(this.demandeur);
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/demandeur']));
      this.toastrService.success("Succès","Demandeur modifié") ;
    }
}

}

