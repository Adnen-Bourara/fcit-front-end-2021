import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { PagesComponent } from './pages.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { FormationComponent } from './formation/formation.component';
import { ActualiteComponent } from './actualite/actualite.component';
import { ParametrageComponent } from './paramétrage/parametrage/parametrage.component';
import { MotCleComponent } from './paramétrage/mot-cle/mot-cle.component';
import { FormateurComponent } from './formateur/formateur.component';
import { IngPedagoComponent } from './ing-pedago/ing-pedago.component';
import { ParametrageFormateurComponent } from './paramétrage/parametrage-formateur/parametrage-formateur.component';
import { FichierComponent } from './paramétrage/parametrage-formateur/support/fichier/fichier.component';
import { ValidationComponent } from './validation/validation.component';
import { ValidationFormateurComponent } from './formateur/validation-formateur/validation-formateur.component';
import { ValidationFormationComponent } from './formation/validation-formation/validation-formation.component';
import { ContactVitrineComponent } from './contact-vitrine/contact-vitrine.component';
import { DemandeurComponent } from './demandeur/demandeur.component';
import { DemandeComponent } from './demande/demande.component';
import { SessionComponent } from './session/session.component';
import { ClientComponent } from './client/client.component';



const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'formation',
      component: FormationComponent,
    },
    {
      path: 'session',
      component: SessionComponent,
    },
    {
      path:'demandeur',
      component:DemandeurComponent,
    },
    {
      path:'client',
      component:ClientComponent,
    },
    {
      path:'demande',
      component:DemandeComponent,
    },
    {
      path: 'formateur',
      component: FormateurComponent,
    },
    {
      path: 'validation',
      component:ValidationComponent,
    },
    {
      path:'validation/formateur',
      component:ValidationFormateurComponent,
    },
    {
      path:'validation/formation',
      component:ValidationFormationComponent,
    },
    {
      path: 'actualite',
      component: ActualiteComponent,
    },
    {
      path:'contact',
      component: ContactVitrineComponent,
    },
    {
      path:'formation/settings',
      component:ParametrageComponent,
    },
    {
      path:'formateur/settings',
      component:ParametrageFormateurComponent,
    },
    {
      path:'support/fichier',
      component:FichierComponent,

    },
    
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
