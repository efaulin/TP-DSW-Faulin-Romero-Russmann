export class User {
  constructor(
    public name: string,
    public passwd: string,
    public mail: string,
    public id?: string,
    public createdAt?: string
  ) {}
}
