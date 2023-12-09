/*export class Note {
  constructor(
    public idItem: string,
    public idSession: string,
    public desc: string,
    public position: number
  ) {}
}*/
/*export class Note {
  constructor(
    public desc: string,
    public position: number,
    public idItem?: string,
    public idSession?: string
  ) {}
}*/
export class Note {
  constructor(
    public desc: string,
    public position: number,
    public board: string,
    public id?: string,
    public createdAt?: string
  ) {}
}
