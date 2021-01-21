import { Client } from '../client/client';
import { Demandeur } from '../demandeur/demandeur';
import { Formation } from '../formation/formation';

export class Demande {
    
id:number;
	
date:Date;
	
dateDebPrevue:Date;

type:String;

etat:String;

prix:number;

lieuPrevue:String;

dureePrevue:number;

horairePrevu:String;

mode:String;

demandeur:Demandeur;

formation:Formation;

client : Client;
}
