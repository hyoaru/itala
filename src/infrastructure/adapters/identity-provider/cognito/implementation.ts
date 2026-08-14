import type { IdentityProvider } from "@/application/ports/identity-provider";

export class CognitoIdentityProvider implements IdentityProvider {
  public async signUp(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<void> {}

  public async signIn(email: string, password: string): Promise<void> {}
}
