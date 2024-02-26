export class Genre{

  public name:string
  public show:boolean
  public id:number
  constructor(name:string, id:number) {
    this.name = name;
    this.id = id;
    this.show = false;
  }

}
