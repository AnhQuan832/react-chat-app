export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  constructor(id: string, name: string, email: string, image: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.image = image;
  }
}
