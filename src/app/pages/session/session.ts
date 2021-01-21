import { Client } from "../client/client";
import { Formateur } from "../formateur/formateur";
import { Formation } from "../formation/formation";

export class Session {
    id: number;
    codeSession: string;
    typeSession: string;
    modeSession: string;
    dateDebSession: Date;
    dureeSession: number;
    horaireSession: string;
    lieuSession: string;
    prixSession: number;
    honoraireFormateur: number;
    fraisSejour: number;
    fraisTransport: number;
    perdiem: number;
    autreFrais: number;
    noteEvalFormateur: number;
    formation: Formation;
    formateur: Formateur;
    client: Client;
}
