export type AuthenticatedSession = {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
};
