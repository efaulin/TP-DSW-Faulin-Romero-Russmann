class Player{
  constructor({user, x, y, label, salto}){
    this.user = user;
    this.x = x;
    this.y = y;
    this.label = label;
    this.salto = salto;

    this.label.textContent = user;
  }
}