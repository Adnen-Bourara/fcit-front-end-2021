import { Catalogue } from '../paramétrage/catalogue/catalogue';

export class Formation {
    id : number ;
    codeFormation : String ;
    intituleFormation : String ;
    dureeFormation : number ;
    nbreMinPart : number ;
    nbreMaxPart : number ;
    descriptionFormation : String ;
    categorieFormation : String ;
    typeFormation: String;
    prixFormation : Number ;
    cible : String ;
    prerequis : String ;
    alaUne : Boolean;
    catalogue:Catalogue;
}
