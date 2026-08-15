export interface IdentityProvider {
  signUp(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<void>;

  signIn(email: string, password: string): Promise<void>;

  verify(email: string, code: string): Promise<void>;

  sendVerification(email: string): Promise<void>;

  requestPasswordReset(email: string): Promise<void>;

  resetPassword(
    email: string,
    code: string,
    newPassword: string,
  ): Promise<void>;
}
