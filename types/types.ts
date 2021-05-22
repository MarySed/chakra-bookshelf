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

export type UserEmailType = {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
};
