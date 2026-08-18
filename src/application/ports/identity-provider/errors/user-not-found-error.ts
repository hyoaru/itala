import { IdentityProviderError } from "./error";

export class IdentityProviderUserNotFoundError extends IdentityProviderError {
  constructor(email: string, options?: ErrorOptions) {
    super(`User ${email} was not found`, options);
    this.name = "IdentityProviderUserNotFoundError";
    Object.setPrototypeOf(this, IdentityProviderUserNotFoundError.prototype);
  }
}
