import { UserInterface } from "./user";

export interface AuthContextInterface {
    user: UserInterface | null;
    login: (data: LoginInterface) => Promise<void>;
    register: (data: RegisterInterface) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: () => boolean;
  }


export interface RegisterInterface {
    fullName: string;
    username: string;
    email: string;
    password: string;
    profession: string;
  }

export interface LoginInterface {
    email: string;
    password: string;
}