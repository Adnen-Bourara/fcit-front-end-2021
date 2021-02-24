import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowRef, NbDateService } from '@nebular/theme';
import { FormateurService } from '../formateur.service';
import { Router } from '@angular/router';
import { Formateur } from '../formateur';
import { DatePipe } from '@angular/common';
import {FichierService} from '../../paramétrage/parametrage-formateur/support/fichier/fichier.service';
import {ResponseFile} from "../../paramétrage/parametrage-formateur/support/fichier/modal-fichier/response-file";

@Component({
  selector: 'ngx-modal-formateur',
  templateUrl: './modal-formateur.component.html',
  styleUrls: ['./modal-formateur.component.scss']
})
export class ModalFormateurComponent implements OnInit {
  A : string;
  formateur:Formateur;
  filePhoto: File;
  fileCv: File;
  res : any = new ResponseFile();
  sourceImage:any;
  photoTouched:boolean;
  cvTouched: boolean;
  emailComfirmed:boolean;
  constructor(
    private  fichierService:FichierService,
    private formateurService:FormateurService,
    private toastrService:NbToastrService,
    private router : Router,
    public windowRef: NbWindowRef,
    protected dateService: NbDateService<Date>
    ) { }

 async ngOnInit(){
    let e = localStorage.getItem('e');
    this.formateur= new Formateur();
    this.photoTouched = false;
    this.cvTouched = false;
   this.emailComfirmed = false;
    if (e === '0' ) {
      this.A = 'Ajouter';
      this.formateur.dateAjout = this.dateService.today();
      this.sourceImage='http://localhost:9099/downloadFile/defaultAvatar.png';
      this.formateur.cv = 'none';


    }
    if (e === '1') {
      this.A = 'Modifier';
      let id = localStorage.getItem('id');
      this.formateur = await this.formateurService.getFormateurByid(+id);
      this.sourceImage=this.formateur.photo;
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



         if(this.photoTouched) {
           this.formateur.photo = this.formateur.email + ' photo';

           this.fichierService.uploadFile(this.filePhoto, this.formateur.photo).subscribe(data => {
             this.res = data;
             this.formateur.photo = this.res.fileDownloadUri;
             console.log(this.formateur.cv);
             if(this.cvTouched)
             {
               this.fichierService.uploadFile(this.fileCv, this.formateur.email + ' cv').subscribe();
               this.formateur.cv = 'http://localhost:9099/downloadFile/' + this.formateur.email + ' cv.'+ this.fileCv.name.split('.').pop();
             }
             else{
               this.formateur.cv = 'none';
             }
             this.formateurService.saveFormateur(this.formateur);
           });
         }
         else {
           this.formateur.photo =   this.sourceImage;
           if(this.cvTouched)
           {
             this.fichierService.uploadFile(this.fileCv, this.formateur.email + ' cv');
             this.formateur.cv = 'http://localhost:9099/downloadFile/' + this.formateur.email + ' cv.'+ this.fileCv.name.split('.').pop();
           }
           else{
             this.formateur.cv = 'none';
           }
           this.formateurService.saveFormateur(this.formateur);
         }
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
          if(this.photoTouched) {
            this.formateur.photo = this.formateur.email + ' photo';

            this.fichierService.uploadFile(this.filePhoto, this.formateur.photo).subscribe(data => {
              this.res = data;
              this.formateur.photo = this.res.fileDownloadUri;
              console.log(this.formateur.cv);
              if(this.cvTouched)
              {
                this.fichierService.uploadFile(this.fileCv, this.formateur.email + ' cv').subscribe();
                this.formateur.cv = 'http://localhost:9099/downloadFile/' + this.formateur.email + ' cv.'+ this.fileCv.name.split('.').pop();
              }
              else{
                this.formateur.cv = 'none';
              }
              this.formateurService.editFormateur(this.formateur);
            });
          }
          else {
            this.formateur.photo =   this.sourceImage;
               if(this.cvTouched)
               {
              this.fichierService.uploadFile(this.fileCv, this.formateur.email + ' cv').subscribe();
              this.formateur.cv = 'http://localhost:9099/downloadFile/' + this.formateur.email + ' cv.'+ this.fileCv.name.split('.').pop();
               }
                else{
                  this.formateur.cv = 'none';
            }
            this.formateurService.editFormateur(this.formateur);
          }
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
  this.filePhoto = event.target.files[0];
  this.photoTouched = true;
  this.fichierService.uploadFile(this.filePhoto,'tempImage').subscribe(data => {
    this.res = data;
    this.sourceImage = this.res.fileDownloadUri;

  })

}

getFileDetails(event)
{
  this.fileCv = event.target.files[0];
  this.cvTouched = true;


}

  confirmEmail()
  {
    this.emailComfirmed = true;
  }

}
