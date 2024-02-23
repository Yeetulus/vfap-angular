import {Author} from "./author";
import {Genre} from "./genre";

export class Book{

  public id:number;
  public title:string;
  public genre:Genre;
  public authors: Author[];
  public pages: number;
  public releaseDate: Date|undefined;

  constructor(id:number, title:string, genre:Genre, pages:number, releaseDate?:Date, authors?: Author[]) {
    this.id = id;
    this.title = title;
    this.genre = genre;
    this.pages = pages;
    this.releaseDate = releaseDate;
    this.authors = authors !== undefined? authors : [];
  }}
