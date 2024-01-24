import {Client} from "./Client";
import {DetailCommande} from "./DetailCommade";

export interface Commande {
  id: any;
  adresse: string;
  commandeDate: Date; // Adjust the type according to your needs
  deliveryDate: Date; // Adjust the type according to your needs
  details: DetailCommande[];
  idClient: any; // Assuming you have a Client model/interface
}
