import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule, NbButtonModule, NbSelectModule, NbCheckboxModule, NbDatepickerModule } from '@nebular/theme';
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { FormationComponent, ButtonViewValidation2Component, ButtonViewDemande1Component } from './formation/formation.component';
import { ModalFormationComponent } from './formation/modal-formation/modal-formation.component';
import { ShowFormationComponent } from './formation/show-formation/show-formation.component';
import { FormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ActualiteComponent } from './actualite/actualite.component';
import { ModalActualiteComponent } from './actualite/modal-actualite/modal-actualite.component';
import { ShowActualiteComponent } from './actualite/show-actualite/show-actualite.component';
import { MotCleComponent } from './paramétrage/mot-cle/mot-cle.component';
import { CatalogueComponent } from './paramétrage/catalogue/catalogue.component';
import { ParametrageComponent } from './paramétrage/parametrage/parametrage.component';
import { FiliereMetierComponent } from './paramétrage/filiere-metier/filiere-metier.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormateurComponent, ButtonViewValidationComponent } from './formateur/formateur.component';
import { ModalFormateurComponent } from './formateur/modal-formateur/modal-formateur.component';
import { ShowFormateurComponent } from './formateur/show-formateur/show-formateur.component';
import { IngPedagoComponent } from './ing-pedago/ing-pedago.component';
import { ModalIngenieurComponent } from './ing-pedago/modal-ingenieur/modal-ingenieur.component';
import { ShowIngenieurComponent } from './ing-pedago/show-ingenieur/show-ingenieur.component';
import { ParametrageFormateurComponent } from './paramétrage/parametrage-formateur/parametrage-formateur.component';
import { SupportComponent, ButtonViewFilesComponent} from './paramétrage/parametrage-formateur/support/support.component';
import { FichierComponent } from './paramétrage/parametrage-formateur/support/fichier/fichier.component';
import { ModalFichierComponent } from './paramétrage/parametrage-formateur/support/fichier/modal-fichier/modal-fichier.component';
import { ShowFichierComponent } from './paramétrage/parametrage-formateur/support/fichier/show-fichier/show-fichier.component';
import { ValidationComponent } from './validation/validation.component';
import { ModalValidationComponent } from './validation/modal-validation/modal-validation.component';
import { ShowValidationComponent } from './validation/show-validation/show-validation.component';
import { ValidationFormateurComponent } from './formateur/validation-formateur/validation-formateur.component';
import { ValidationFormationComponent } from './formation/validation-formation/validation-formation.component';
import { ModalSupportComponent } from './paramétrage/parametrage-formateur/support/modal-support/modal-support.component';
import { ContactVitrineComponent } from './contact-vitrine/contact-vitrine.component';
import { DemandeComponent } from './demande/demande.component';
import { ButtonViewDemandeComponent, DemandeurComponent } from './demandeur/demandeur.component';
import { ModalDemandeurComponent } from './demandeur/modal-demandeur/modal-demandeur.component';
import { ShowDemandeurComponent } from './demandeur/show-demandeur/show-demandeur.component';
import { ModalDemandeComponent } from './demande/modal-demande/modal-demande.component';
import { ShowDemandeComponent } from './demande/show-demande/show-demande.component';
import { SessionComponent } from './session/session.component';
import { ModalSessionComponent } from './session/modal-session/modal-session.component';
import { ShowSessionComponent } from './session/show-session/show-session.component';
import { ClientComponent } from './client/client.component';
import { ModalClientComponent } from './client/modal-client/modal-client.component';
import { ShowClientComponent } from './client/show-client/show-client.component';
import { ParticipantComponent } from './participant/participant.component';










@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    NbCardModule,
    NbButtonModule,
    Ng2SmartTableModule,
    FormsModule,
    NbSelectModule,
    NgSelectModule,
    FormsModule,
    CKEditorModule,
    NbCheckboxModule,
    NbDatepickerModule, 
 
    
    
  ],
  declarations: [
    PagesComponent,
    FormationComponent,
    ModalFormationComponent,
    ShowFormationComponent,
    ActualiteComponent,
    ModalActualiteComponent,
    ShowActualiteComponent,
    MotCleComponent,
    CatalogueComponent,
    ParametrageComponent,
    FiliereMetierComponent,
    FormateurComponent,
    ModalFormateurComponent,
    ShowFormateurComponent,
    IngPedagoComponent,
    ModalIngenieurComponent,
    ShowIngenieurComponent,
    SupportComponent,
    ParametrageFormateurComponent,
    ButtonViewFilesComponent,
    FichierComponent,
    ModalFichierComponent,
    ShowFichierComponent,
    ValidationComponent,
    ModalValidationComponent,
    ShowValidationComponent,
    ButtonViewValidationComponent,
    ButtonViewValidation2Component,
    ValidationFormateurComponent,
    ValidationFormationComponent,
    ModalSupportComponent,
    ContactVitrineComponent,
    DemandeComponent,
    DemandeurComponent,
    ModalDemandeurComponent,
    ShowDemandeurComponent,
    ModalDemandeComponent,
    ShowDemandeComponent,
    ButtonViewDemandeComponent,
    ButtonViewDemande1Component,
    SessionComponent,
    ModalSessionComponent,
    ShowSessionComponent,
    ClientComponent,
    ModalClientComponent,
    ShowClientComponent,
    ParticipantComponent,

    



  ],
})
export class PagesModule {
}
