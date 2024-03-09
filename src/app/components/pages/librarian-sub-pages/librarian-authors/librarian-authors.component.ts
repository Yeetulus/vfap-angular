import {Component, OnInit} from '@angular/core';
import {AuthorService} from "../../../../services/author/author.service";
import {Author} from "../../../../models/book/author";
import {ModalService} from "../../../../services/modal/modal.service";
import {PageEvent} from "@angular/material/paginator";
import {of} from "rxjs";
import {ModalParams} from "../../../../models/modal/modal-params";
import BookRequest from "../../../../models/book/book-request";

@Component({
  selector: 'app-librarian-authors',
  templateUrl: './librarian-authors.component.html',
  styleUrls: ['./librarian-authors.component.css', '../../../../../style.scss']
})
export class LibrarianAuthorsComponent implements OnInit{

  searchTerm: string = "";

  authors: Author[] = [];
  filteredAuthors: Author[] = [];
  displayedAuthors: Author[] = [];

  currentPage: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  constructor(private authorService: AuthorService,
              private modalService: ModalService) {
  }
  searchAuthors($event: string): void {
    this.searchTerm = $event;
    this.filterAuthors();
  }

  ngOnInit(): void {
    this.authorService.fetchAuthors();
    this.authorService.authorSubject.subscribe(value => {
      this.authors = value;
      this.filterAuthors();
    });

  }

  pageChanged(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.updateDisplayedAuthors();
  }

  private updateDisplayedAuthors(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedAuthors = this.filteredAuthors.slice(startIndex, endIndex);
  }

  createAuthor() {
    const modalParams: ModalParams = {
      title: `Create new author`,
      fields: [
        {name: "name", placeholder: "Name", type: "text"},
      ]
    };
    this.modalService.openModal(modalParams).subscribe(value => {
      if(value && value.name){
        this.authorService.create(value.name).subscribe();
      }
    });
  }

  deleteAuthor(author: Author) {
    this.authorService.delete(author).subscribe();
  }

  editAuthor(author: Author) {
    const modalParams: ModalParams = {
      title: `Edit author ${author.name}`,
      fields: [
        {name: "newName", placeholder: "New name", type: "text", initialValue: author.name},
      ]
    };
    this.modalService.openModal(modalParams).subscribe(value => {
      if(value && value.newName){
        this.authorService.update(author, value.newName).subscribe();
      }
    });
  }

  private filterAuthors() {
    this.filteredAuthors = this.authors.filter(author =>
      author.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      author.books.some(book => book.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );

    this.updateDisplayedAuthors();
  }
}
