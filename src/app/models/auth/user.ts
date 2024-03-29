import {UserRole} from "./user-role";

export class User{
    id:number;
    email:string;
    firstName:string;
    lastName:string;
    role: UserRole;

    constructor(id: number, email: string, firstName: string, lastName: string, role: UserRole) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }
}
