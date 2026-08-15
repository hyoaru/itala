import { IdentityProviderError } from "./error";

export class IdentityProviderUserNotConfirmedError extends IdentityProviderError {
  constructor(email: string, options?: ErrorOptions) {
    super(`User ${email} is not confirmed`, options);
    this.name = "IdentityProviderUserNotConfirmedError";
  }
}
