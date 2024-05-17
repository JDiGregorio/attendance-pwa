export type TUserState = {
    isOnline: boolean;
	isAuthenticated: boolean;
	email: string | null;
	token: string | null;
    user: TUser | Partial<TUser>;
	permissions: TPermission | Partial<TPermission>;
    lastUpdateDate: Date | null;
    hasUpdates: boolean;
    initialized: boolean;
}

export type TCredentials = {
    email: string | null;
    password: string | null;
}

type TUser = {
    id: number | null;
    name: string | null;
    shortname: string | null;
}

export type TPermission = {
    createReport: boolean;
    createBeneficiary: boolean;
    createSession: boolean;
}

export type TErrors = {
    email?: string | null;
    password?: string | null;
    passwordConfirmation?: string;
}