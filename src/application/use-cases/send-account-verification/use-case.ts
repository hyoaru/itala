import type { IdentityProvider } from "@/application/ports/identity-provider";
import type { UseCase } from "../interface";
import type { SendAccountVerificationRequest } from "./request";

export class SendAccountVerification implements UseCase<void> {
  private request: SendAccountVerificationRequest;
  private idp: IdentityProvider;

  public constructor(
    idp: IdentityProvider,
    request: SendAccountVerificationRequest,
  ) {
    this.request = request;
    this.idp = idp;
  }

  public async execute(): Promise<void> {
    await this.idp.sendVerification(this.request.email);
  }
}
