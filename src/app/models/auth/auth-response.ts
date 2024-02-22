import {UserRole} from "./user-role";

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  role: UserRole
}
