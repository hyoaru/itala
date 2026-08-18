import type { IdentityProvider } from "@/application/ports/identity-provider";
import type { UseCase } from "../interface";
import type { SendPasswordResetRequest } from "./request";

export class SendPasswordReset implements UseCase<void> {
  private request: SendPasswordResetRequest;
  private idp: IdentityProvider;

  public constructor(idp: IdentityProvider, request: SendPasswordResetRequest) {
    this.request = request;
    this.idp = idp;
  }

  public async execute(): Promise<void> {
    await this.idp.requestPasswordReset(this.request.email);
  }
}
