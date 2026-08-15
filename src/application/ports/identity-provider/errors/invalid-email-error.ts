import { IdentityProviderError } from "./error";

export class IdentityProviderInvalidEmailError extends IdentityProviderError {
  constructor(email: string, options?: ErrorOptions) {
    super(`Invalid email address: ${email}`, options);
    this.name = "IdentityProviderInvalidEmailError";
  }
}
