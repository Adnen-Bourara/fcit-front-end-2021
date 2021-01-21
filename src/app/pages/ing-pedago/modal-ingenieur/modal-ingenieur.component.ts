import { Component, OnInit } from '@angular/core';
import { Ingenieur } from '../ingenieur';
import { NbWindowRef, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { IngenieurService } from '../ingenieur.service';

@Component({
  selector: 'ngx-modal-ingenieur',
  templateUrl: './modal-ingenieur.component.html',
  styleUrls: ['./modal-ingenieur.component.scss']
})
export class ModalIngenieurComponent implements OnInit {

  constructor(
    private IngService:IngenieurService,
    private toastrService:NbToastrService,
    private router : Router, 
    public windowRef: NbWindowRef,
  ) { }
  A : string;
  ingenieur:Ingenieur;

  async ngOnInit() {
    let e = localStorage.getItem('e');
    this.ingenieur = new Ingenieur();

    if (e === '0' ) {
      this.A = 'Ajouter';

    }
    if (e === '1') {
      this.A = 'Modifier';
      let id = localStorage.getItem('id'); 
      this.ingenieur = await this.IngService.getIngenieurByid(+id);
    }


  }
  fermer()
  {
    this.windowRef.close();
  }

  getFileDetails(event)
{
  this.ingenieur.cv=event.target.files[0].name;
}

  onAddIng()
  {
    let e = localStorage.getItem('e');
    if (e === '0') 
    {
        this.IngService.addIng(this.ingenieur);
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        {  
        this.router.navigate(['/pages/formateur/settings']);
        this.router.navigate(['/pages/formateur/settings']);
        });
        this.toastrService.success("Succès","Ingénieur pédagogique Ajouté") ;
     

      }

    if( e === '1')
      { 
        
        this.IngService.editIng(this.ingenieur.id,this.ingenieur);
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        {  
        this.router.navigate(['/pages/formateur/settings']);
        });
        this.toastrService.success("Succès","Ingénieur pédagogique modifié");
 

      }
  }


}
