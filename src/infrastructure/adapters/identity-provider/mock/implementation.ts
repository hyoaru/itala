import { type IdentityProvider } from "@/application/ports/identity-provider";

export class MockIdentityProvider implements IdentityProvider {
  public async signUp(
    _email: string,
    _firstName: string,
    _lastName: string,
    _password: string,
  ): Promise<void> {}

  public async signIn(_email: string, _password: string): Promise<void> {}

  public async verify(code: string): Promise<void> {}
}
