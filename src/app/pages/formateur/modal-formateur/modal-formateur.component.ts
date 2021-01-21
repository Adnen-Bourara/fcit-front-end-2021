import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowRef, NbDateService } from '@nebular/theme';
import { FormateurService } from '../formateur.service';
import { Router } from '@angular/router';
import { Formateur } from '../formateur';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-modal-formateur',
  templateUrl: './modal-formateur.component.html',
  styleUrls: ['./modal-formateur.component.scss']
})
export class ModalFormateurComponent implements OnInit {
  A : string;
  formateur:Formateur;
  sourceImage:any;
  constructor( 
    private formateurService:FormateurService,
    private toastrService:NbToastrService,
    private router : Router, 
    public windowRef: NbWindowRef,
    protected dateService: NbDateService<Date>
    ) { }

 async ngOnInit(){
    let e = localStorage.getItem('e');
    this.formateur= new Formateur();
    if (e === '0' ) {
      this.A = 'Ajouter';
      this.formateur.dateAjout=this.dateService.today();
      this.formateur.photo="defaultAvatar.png";
      this.sourceImage="http://localhost:8080/images/defaultAvatar.png";

    }
    if (e === '1') {
      this.A = 'Modifier';
      let id = localStorage.getItem('id'); 
      this.formateur = await this.formateurService.getFormateurByid(+id);
      this.sourceImage="http://localhost:8080/images/"+this.formateur.photo;
      this.formateur.dateAjout=new Date(this.formateur.dateAjout);
      this.formateur.valVisa=new Date(this.formateur.valVisa);

    }
  }

fermer()
  {
    this.windowRef.close();
  }


async onAddFormateur()
  {
    let e = localStorage.getItem('e');
    if (e === '0') 
      {
       if(this.formateur.copieCin!=this.formateur.cin)
       {
        this.toastrService.danger("Erreur","Vérifier CIN") ;
       }
      else if(this.formateur.copiePassport!=this.formateur.passport)
       {
        this.toastrService.danger("Erreur","Vérifier passport") ;
       }
      else if(this.formateur.copieRib!=this.formateur.rib)
       {
        this.toastrService.danger("Erreur","Vérifier RIB") ;
       }
       
       else
       {
        this.formateurService.saveFormateur(this.formateur);
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/formateur']));
        this.toastrService.success("Succès","Formateur Ajouté") ;
       }      

      }

    if( e === '1')
      { 
        if(this.formateur.copieCin!=this.formateur.cin)
        {
         this.toastrService.danger("Erreur","Vérifier CIN") ;
        }
        else if(this.formateur.copiePassport!=this.formateur.passport)
        {
         this.toastrService.danger("Erreur","Vérifier passport") ;
        }

        else if(this.formateur.copieRib!=this.formateur.rib)
        {
         this.toastrService.danger("Erreur","Vérifier RIB") ;
        }
        
        else
        {
        this.formateurService.editFormateur(this.formateur);
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/formateur']));
        this.toastrService.success("Succès","Formateur modifié");
        }

      }
}


getFileDetailsPhoto (event) 
{
  this.formateur.photo=event.target.files[0].name;
  console.log(this.formateur.photo);
  this.sourceImage="http://localhost:8080/images/"+this.formateur.photo;
}

getFileDetails(event)
{
  this.formateur.cv=event.target.files[0].name;
}

}
