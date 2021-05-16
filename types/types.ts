export type ProviderAccountType = {
  provider: string;
  type: string;
  id: number;
  accessToken: string;
  accessTokenExpires?: string | null;
  refreshToken?: string;
  idToken?: string;
  access_token: string;
  scope: string;
  token_type: string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  emailVerified?: string | null;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

export type UserEmailType = {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
};

export type SessionType = {
  user: UserType;
  accessToken: string;
  expires: string | Date;
};
