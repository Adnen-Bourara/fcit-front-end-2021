import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-parametrage-formateur',
  templateUrl: './parametrage-formateur.component.html',
  styleUrls: ['./parametrage-formateur.component.scss']
})
export class ParametrageFormateurComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.clear();
  }




}
