import {DetailCommande} from "./DetailCommade";
import {Client} from "./Client";
import {FakeDetailCommande} from "./FakeDetailCommande";

export interface FakeCommande {
  adresse: string;
  commandeDate: Date; // Adjust the type according to your needs
  deliveryDate: Date; // Adjust the type according to your needs
  idClient: any; // Assuming you have a Client model/interface
}
