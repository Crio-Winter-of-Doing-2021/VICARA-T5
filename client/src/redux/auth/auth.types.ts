export interface Userinfo {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  emailVerified: boolean;
  providerId: string;
}

export const defaultAuthState: Userinfo = {
  displayName: "",
  email: "",
  photoURL: "",
  uid: "",
  emailVerified: false,
  providerId: "",
};

export type AuthReducer = Userinfo;
