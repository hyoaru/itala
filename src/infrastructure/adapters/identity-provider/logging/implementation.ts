import type { IdentityProvider } from "@/application/ports/identity-provider";
import { logger } from "@/infrastructure/logger";

export class LoggingIdentityProvider implements IdentityProvider {
  private inner: IdentityProvider;

  public constructor(inner: IdentityProvider) {
    this.inner = inner;
  }

  public async signUp(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<void> {
    try {
      logger.debug("Signing up", { email });
      const result = await this.inner.signUp(
        email,
        firstName,
        lastName,
        password,
      );
      logger.info("Sign up successful", { email });
      return result;
    } catch (error) {
      logger.error("Sign up failed", { email });
      throw error;
    }
  }

  public async signIn(email: string, password: string): Promise<void> {
    try {
      logger.debug("Signing in", { email });
      const result = await this.inner.signIn(email, password);
      logger.info("Sign in successful", { email });
      return result;
    } catch (error) {
      logger.error("Sign in failed", { email });
      throw error;
    }
  }
}
