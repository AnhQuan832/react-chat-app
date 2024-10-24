export class User {
  id: string;
  name: string;
  email: string;
  image?: string;
  token: string | undefined;
  constructor(
    id: string,
    name: string,
    email: string,
    image?: string,
    token?: string
  );
  constructor(user: {
    id: string;
    name: string;
    email: string;
    image?: string;
    token?: string;
  });
  constructor(
    idOrUser:
      | string
      | {
          id: string;
          name: string;
          email: string;
          image?: string;
          token?: string;
        },
    name?: string,
    email?: string,
    image?: string,
    token?: string
  ) {
    if (typeof idOrUser === "string") {
      this.id = idOrUser;
      this.name = name!;
      this.email = email!;
      this.image = image;
      this.token = token;
    } else {
      this.id = idOrUser.id;
      this.name = idOrUser.name;
      this.email = idOrUser.email;
      this.image = idOrUser.image;
      this.token = idOrUser.token;
    }
  }
}
