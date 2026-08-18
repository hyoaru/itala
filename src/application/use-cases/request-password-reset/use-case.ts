import type { IdentityProvider } from "@/application/ports/identity-provider";
import type { UseCase } from "../interface";
import type { RequestPasswordResetRequest } from "./request";

export class RequestPasswordReset implements UseCase<void> {
  private request: RequestPasswordResetRequest;
  private idp: IdentityProvider;

  public constructor(
    idp: IdentityProvider,
    request: RequestPasswordResetRequest,
  ) {
    this.request = request;
    this.idp = idp;
  }

  public async execute(): Promise<void> {
    await this.idp.requestPasswordReset(this.request.email);
  }
}
