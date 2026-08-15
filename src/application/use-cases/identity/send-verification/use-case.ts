import type { IdentityProvider } from "@/application/ports/identity-provider";
import type { UseCase } from "../interface";
import type { SendVerificationRequest } from "./request";

export class SendVerification implements UseCase<void> {
  private request: SendVerificationRequest;
  private idp: IdentityProvider;

  public constructor(idp: IdentityProvider, request: SendVerificationRequest) {
    this.request = request;
    this.idp = idp;
  }

  public async execute(): Promise<void> {
    await this.idp.sendVerification(this.request.email);
  }
}
