import { IdentityProviderError } from "./error";

export class IdentityProviderEmailAlreadyExistsError extends IdentityProviderError {
  constructor(email: string, options?: ErrorOptions) {
    super(`An account with ${email} already exists`, options);
    this.name = "IdentityProviderEmailAlreadyExistsError";
  }
}
