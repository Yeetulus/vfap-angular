import {Component} from '@angular/core';
import {Book} from "../../../../models/book/book";
import {BookService} from "../../../../services/book/book.service";
import {CopyService} from "../../../../services/copy/copy.service";
import {BookCopy} from "../../../../models/book/book-copy";
import {CopyCondition} from "../../../../models/book/copy-condition";
import {LoanService} from "../../../../services/loan/loan.service";
import {ModalService} from "../../../../services/modal/modal.service";
import {ModalParams} from "../../../../models/modal/modal-params";

@Component({
  selector: 'app-librarian-copies',
  templateUrl: './librarian-copies.component.html',
  styleUrls: ['./librarian-copies.component.css', '../../../../../style.scss']
})
export class LibrarianCopiesComponent {

    selectedBook?: Book;
    bookResults: Book[] = [];
    copies: BookCopy[] = [];


    constructor(private bookService: BookService,
                private copyService: CopyService,
                private loanService: LoanService,
                private modalService: ModalService) {
    }
    searchBooks($event: string) {
        if($event.trim().length == 0) return;
        this.bookService.getBooks($event, undefined, value => {
            console.log(value);
            return this.bookResults = value;
        }).subscribe();
    }
    searchBooksSubmit($event: string) {
        if($event.trim().length == 0) return;
        this.bookService.getBooks($event, undefined, value => {
            console.log(value);
            if(value.length === 1){
                this.selectBook(value[0]);
            }
            return this.bookResults = value;
        }).subscribe();
    }

    selectBook(book: Book) {
        this.selectedBook = book;
        this.copyService.getAllCopies(book).subscribe(value => {
            this.copies = value;
        });
    }

    eliminateCopy(copy: BookCopy) {
        this.copyService.updateCopy(copy, CopyCondition.ELIMINATED).subscribe(value => {
            copy.bookCondition = value.bookCondition;
        });
    }
    protected readonly CopyCondition = CopyCondition;
    email: any;

    createLoan(copy: BookCopy) {
        const modalParams: ModalParams = {
            title: `Create loan for copy ${copy.id}`,
            fields: [
                {name: "email", placeholder: "Email", type: "text"}
            ]
        };
        this.modalService.openModal(modalParams).subscribe(value => {
            if(value.email){
                this.loanService.createLoan(copy, value.email).subscribe(value =>{
                    console.log(value);
                });
            }
        });
    }

}
