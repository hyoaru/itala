import { IdentityProviderError } from "./error";

export class IdentityProviderInvalidCredentialsError extends IdentityProviderError {
  constructor(email: string, options?: ErrorOptions) {
    super(`Invalid credentials for ${email}`, options);
    this.name = "IdentityProviderInvalidCredentialsError";
    Object.setPrototypeOf(this, IdentityProviderInvalidCredentialsError.prototype);
  }
}
