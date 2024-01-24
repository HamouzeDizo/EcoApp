export class FakeClient{
  private id: number | undefined;
  nom: string | undefined;
  prenom: string | undefined;
  age: number | undefined;
  email: string | undefined;
  password: string | undefined;


  constructor(id: number | undefined, nom: string | undefined, prenom: string | undefined, age: number | undefined, email: string | undefined, password: string | undefined) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.age = age;
    this.email = email;
    this.password = password;
  }
}
