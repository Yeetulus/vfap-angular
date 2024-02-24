import {Component, OnInit} from '@angular/core';
import {BookService} from "../../services/book/book.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  public showFooter = false;

  constructor(private bookService: BookService) {
  }
  ngOnInit(): void {
    this.bookService.showResults.subscribe(value => {
      this.showFooter = !value;
    })
  }

}
