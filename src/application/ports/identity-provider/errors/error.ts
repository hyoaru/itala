export class IdentityProviderError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "IdentityProviderError";
    Object.setPrototypeOf(this, IdentityProviderError.prototype);
  }
}
