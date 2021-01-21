import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { Fichier } from '../fichier';
import { FichierService } from '../fichier.service';

@Component({
  selector: 'ngx-modal-fichier',
  templateUrl: './modal-fichier.component.html',
  styleUrls: ['./modal-fichier.component.scss']
})
export class ModalFichierComponent implements OnInit {
fichier:Fichier;
file: File;
A:any;
idS:any;
fileSelect:any;
  constructor(
    private fichierService:FichierService,
    private toastrService:NbToastrService,
    private router : Router,
    public windowRef: NbWindowRef,) { }

  async ngOnInit() {
    this.idS = localStorage.getItem('idS')
    this.fichier = new Fichier();
      this.A = 'Ajouter';
  }



  fermer()
  {
    this.windowRef.close();
  }


async onAddFichier() {

    console.log(this.fichier);

      this.fichierService.uploadFile(this.file,this.fichier.nom).subscribe(data => {
        this.fichier.url = data.fileDownloadUri;
        this.fichierService.addFichier(this.fichier,this.idS);});


        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        {

        this.router.navigate(['/pages/support/fichier']);
        this.router.navigate(['/pages/support/fichier']);
        });
        this.toastrService.success("Succès","fichier Ajouté") ;






}


getFileDetails (event) {
   this.fichier.type = event.target.files[0].name.split('?')[0].split('.').pop();
    const size = event.target.files[0].size;
   this.fichier.taille = `${Math.round(size / 1024)} KB`;
  this.file = event.target.files[0];
}

}


