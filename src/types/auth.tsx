export type TUserState = {
	isAuthenticated: boolean;
	email: string | null;
	token: string | null;
}

export type TCredentials = {
    email: string | null;
    password: string | null;
}

export type TErrors = {
    email?: string | null;
    password?: string | null;
    passwordConfirmation?: string;
}