import { IdentityProviderError } from "./error";

export class IdentityProviderUserNotVerifiedError extends IdentityProviderError {
  constructor(email: string, options?: ErrorOptions) {
    super(`User ${email} is not verified`, options);
    this.name = "IdentityProviderUserNotVerifiedError";
    Object.setPrototypeOf(this, IdentityProviderUserNotVerifiedError.prototype);
  }
}
