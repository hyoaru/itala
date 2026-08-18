import { IdentityProviderError } from "./error";

export class IdentityProviderCodeDeliveryFailureError extends IdentityProviderError {
  constructor(email: string, options?: ErrorOptions) {
    super(`Could not deliver verification code to ${email}`, options);
    this.name = "IdentityProviderCodeDeliveryFailureError";
    Object.setPrototypeOf(this, IdentityProviderCodeDeliveryFailureError.prototype);
  }
}
