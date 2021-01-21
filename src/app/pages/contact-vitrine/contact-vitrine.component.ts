import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Vitrine } from './vitrine';
import { VitrineService } from './vitrine.service';

@Component({
  selector: 'ngx-contact-vitrine',
  templateUrl: './contact-vitrine.component.html',
  styleUrls: ['./contact-vitrine.component.scss']
})
export class ContactVitrineComponent implements OnInit {

  constructor(private vitrineService:VitrineService,
    private router : Router,
    private toastrService:NbToastrService, ) { }
vitrine= new Vitrine();
 async ngOnInit() {

  this.vitrine = await this.vitrineService.getVitrine();
  }

  save()
  {
    this.vitrineService.saveVitrine(this.vitrine);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/pages/contact']));
    this.toastrService.success("Succès","Détails sauvgardé");

  }

}
