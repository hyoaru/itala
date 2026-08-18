import { IdentityProviderError } from "./error";

export class IdentityProviderInvalidCodeError extends IdentityProviderError {
  constructor(options?: ErrorOptions) {
    super("Invalid or expired confirmation code", options);
    this.name = "IdentityProviderInvalidCodeError";
    Object.setPrototypeOf(this, IdentityProviderInvalidCodeError.prototype);
  }
}
