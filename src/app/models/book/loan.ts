import {BookCopy} from "./book-copy";
import {User} from "../auth/user";

export class Loan{
    id:number;
    copy:BookCopy;
    user: User;

    constructor(id: number, copy: BookCopy, user: User) {
        this.id = id;
        this.copy = copy;
        this.user = user;
    }
}
