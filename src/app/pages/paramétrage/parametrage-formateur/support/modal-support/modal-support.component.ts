import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { Support } from '../support';
import { SupportService } from '../support.service';

@Component({
  selector: 'ngx-modal-support',
  templateUrl: './modal-support.component.html',
  styleUrls: ['./modal-support.component.scss']
})
export class ModalSupportComponent implements OnInit {

  constructor( 
    private supportService: SupportService,
    private toastrService:NbToastrService,
    private router : Router, 
    public windowRef: NbWindowRef,) { }
  A:any;
  idS:any;
  support= new Support();
  async ngOnInit() {
    let e = localStorage.getItem('e');
    if (e === '0' ) {
      this.A = 'Ajouter';


    }
    if (e === '1') {
      this.A = 'Modifier';
      let id = localStorage.getItem('id'); 
      this.support = await this.supportService.getSupportById(+id);
      this.support.date = new Date(this.support.date);
    }

  }



  fermer()
  {
    this.windowRef.close();
  }


async onAddSupport()
  {
    let e = localStorage.getItem('e');

    if (e === '0') 
    {
        this.supportService.addSupport(this.support);
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        {  
        this.router.navigate(['/pages/formateur/settings']);
        });
        this.toastrService.success("Succès","Support Ajouté") ;
     

      }

    if( e === '1')
      { 
        this.supportService.editSupport(this.support);
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        {  
        this.router.navigate(['/pages/formateur/settings']);
        });
        this.toastrService.success("Succès","Support modifié");
 

      }
}


}
