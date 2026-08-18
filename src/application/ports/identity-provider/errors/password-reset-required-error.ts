import { IdentityProviderError } from "./error";

export class IdentityProviderPasswordResetRequiredError extends IdentityProviderError {
  constructor(email: string, options?: ErrorOptions) {
    super(`Password reset required for ${email}`, options);
    this.name = "IdentityProviderPasswordResetRequiredError";
    Object.setPrototypeOf(this, IdentityProviderPasswordResetRequiredError.prototype);
  }
}
