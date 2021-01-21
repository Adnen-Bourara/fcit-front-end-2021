import { Component, OnInit } from '@angular/core';
import { IngenieurService } from '../ingenieur.service';
import { NbWindowRef } from '@nebular/theme';
import { Ingenieur } from '../ingenieur';

@Component({
  selector: 'ngx-show-ingenieur',
  templateUrl: './show-ingenieur.component.html',
  styleUrls: ['./show-ingenieur.component.scss']
})
export class ShowIngenieurComponent implements OnInit {

  constructor(private IngService:IngenieurService,
    public windowRef: NbWindowRef,) { }
    ingenieur:Ingenieur;
  async ngOnInit() {
    this.ingenieur = new Ingenieur();
    let id = localStorage.getItem('id'); 
    this.ingenieur = await this.IngService.getIngenieurByid(+id);
  }

  fermer()
  {
    this.windowRef.close();
  }


}
