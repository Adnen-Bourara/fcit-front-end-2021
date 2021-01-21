import { Component, OnInit } from '@angular/core';
import { Actualite } from '../actualite';
import { ActualiteServiceService } from '../actualite-service.service';
import { Router } from '@angular/router';
import { NbWindowRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-modal-actualite',
  templateUrl: './modal-actualite.component.html',
  styleUrls: ['./modal-actualite.component.scss']
})
export class ModalActualiteComponent implements OnInit {
  selectedFile: File;
  retrievedImage: any;
  retrievedImageName:any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  actualite : Actualite
  res:any;
  source : any
  A : string 
  public imagePath;
  imgURL: any;


  constructor(private serviceactualite :ActualiteServiceService,
    private router : Router , 
    public windowRef: NbWindowRef,
    private toastrService:NbToastrService, ) { }

  async ngOnInit(){
    let e = localStorage.getItem('e');
    this.actualite = new Actualite();
    if (e === '0' ) {
      this.A = 'Ajouter';
      this.retrievedImage = "http://localhost:8080/images/actualite None.gif";
    }
    if (e === '1') {
      this.A = 'Modifier';
      let id = localStorage.getItem('id');
     this.actualite =  await this.serviceactualite.GetActualiteById(+id);
     this.getImage(+id);
     }
  }

  async onAddActualite()
{


    let e = localStorage.getItem('e');
      if (e === '0') 
      { this.actualite = await this.serviceactualite.AddActualite(this.actualite)
        this.onUpload(this.actualite.id);
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/actualite']));
        this.toastrService.success("Succès","Actualité Ajoutée")
            
      }
      if( e === '1')
      { 
        console.log(this.actualite);
        await this.serviceactualite.EditActualite(this.actualite);
        if( this.retrievedImage!=null)
        {
        await this.serviceactualite.deleteImage(this.actualite.id);
        }
        this.onUpload(this.actualite.id);
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/actualite']));
        this.toastrService.success("Succès","Actualité modifiée");
      }


}



  fermer()  
     {
      this.windowRef.close();
     }




  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile); 
    reader.onload = (_event) => { 
      this.retrievedImage = reader.result; 
      this.retrievedImageName = event.target.files[0].name;
    }
  }

  
 
  
 
  
  


  async onUpload(id:number) {
    console.log(this.selectedFile);
  
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name); 
  await this.serviceactualite.uploadimage(id,uploadImageData);
   
}

async getImage(id:number)
{
this.res = await this.serviceactualite.getimage(id);
this.retrieveResonse = this.res;
this.retrievedImageName = this.res.name;
this.base64Data = this.retrieveResonse.picByte;
this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
}




}
