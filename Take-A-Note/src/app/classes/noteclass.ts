export class Note {
  constructor(
    public desc: string,
    public position: number,
    public board: string,
    public id?: string,
    public createdAt?: string
  ) {}
}
