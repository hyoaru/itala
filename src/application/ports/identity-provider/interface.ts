export interface IdentityProvider {
  signUp(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<void>;

  signIn(email: string, password: string): Promise<void>;

  verify(email: string, code: string): Promise<void>;
}
