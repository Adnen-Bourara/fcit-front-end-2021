import {Participant} from "../participant";
import {Session} from "../../session";

export class Participation {
  id:number;
  rapportEval:String;
  noteQcm:number;
  dateEval:Date;
  participant:Participant;
  session:Session;

}
