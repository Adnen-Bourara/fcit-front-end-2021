import { Formation } from '../formation/formation';
import { Support } from '../paramétrage/parametrage-formateur/support/support';
import { Formateur } from '../formateur/formateur';
import { Ingenieur } from '../ing-pedago/ingenieur';

export class Validation {

    id:number;
	    
    date:Date;
    
    decision:String;
    
    remarque:String ;

    formation:Formation;

    support:Support

    formateur:Formateur;

    ingpedago:Ingenieur;
	

}
