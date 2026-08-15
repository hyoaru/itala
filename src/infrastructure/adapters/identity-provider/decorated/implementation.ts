import type { IdentityProvider } from "@/application/ports/identity-provider";
import { LoggingIdentityProvider } from "../logging";

export class DecoratedIdentityProvider implements IdentityProvider {
  private inner: IdentityProvider;

  public constructor(inner: IdentityProvider) {
    this.inner = new LoggingIdentityProvider(inner);
  }

  public async signUp(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<void> {
    return await this.inner.signUp(email, firstName, lastName, password);
  }

  public async signIn(email: string, password: string): Promise<void> {
    return await this.inner.signIn(email, password);
  }

  public async verify(email: string, code: string): Promise<void> {
    return await this.inner.verify(email, code);
  }

  public async sendVerification(email: string): Promise<void> {
    return await this.inner.sendVerification(email);
  }
}
