export class Client{
  private _id: number | undefined;
  nom: string | undefined;
  prenom: string | undefined;
  age: number | undefined;
  private _email: string | undefined;
  password: string | undefined;



  constructor( nom: string | undefined, prenom: string | undefined, age: number | undefined, email: string | undefined, password: string | undefined) {
    this.nom = nom;
    this.prenom = prenom;
    this.age = age;
    this.email = email;
    this.password = password;
  }

  get id(): number | undefined {
    return this._id;
  }

  set id(value: number | undefined) {
    this._id = value;
  }

  get email(): string | undefined {
    return this._email;
  }

  set email(value: string | undefined) {
    this._email = value;
  }
}
