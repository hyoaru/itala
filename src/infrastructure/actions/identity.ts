import {
  RequestPasswordReset,
  ResetPassword,
  SendVerification,
  SignIn,
  SignUp,
  Verify,
  type RequestPasswordResetRequest,
  type ResetPasswordRequest,
  type SendVerificationRequest,
  type SignInRequest,
  type SignUpRequest,
  type VerifyRequest,
} from "@/application/use-cases";
import { mutationOptions } from "@tanstack/react-query";
import {
  CognitoIdentityProvider,
  DecoratedIdentityProvider,
} from "../adapters/identity-provider";

const baseKey = "identity";

const identityProvider = new DecoratedIdentityProvider(
  new CognitoIdentityProvider(),
);

export const identityActions = {
  signIn: () =>
    mutationOptions({
      mutationKey: [baseKey, "sign_in"],
      mutationFn: (request: SignInRequest) =>
        new SignIn(identityProvider, {
          email: request.email,
          password: request.password,
        }).execute(),
    }),
  signUp: () =>
    mutationOptions({
      mutationKey: [baseKey, "sign_up"],
      mutationFn: (request: SignUpRequest) =>
        new SignUp(identityProvider, {
          email: request.email,
          firstName: request.firstName,
          lastName: request.lastName,
          password: request.password,
        }).execute(),
    }),
  verify: () =>
    mutationOptions({
      mutationKey: [baseKey, "verify"],
      mutationFn: (request: VerifyRequest) =>
        new Verify(identityProvider, {
          email: request.email,
          code: request.code,
        }).execute(),
    }),
  sendVerification: () =>
    mutationOptions({
      mutationKey: [baseKey, "send_verification"],
      mutationFn: (request: SendVerificationRequest) =>
        new SendVerification(identityProvider, {
          email: request.email,
        }).execute(),
    }),
  requestPasswordReset: () =>
    mutationOptions({
      mutationKey: [baseKey, "request_password_reset"],
      mutationFn: (request: RequestPasswordResetRequest) =>
        new RequestPasswordReset(identityProvider, {
          email: request.email,
        }).execute(),
    }),
  resetPassword: () =>
    mutationOptions({
      mutationKey: [baseKey, "reset_password"],
      mutationFn: (request: ResetPasswordRequest) =>
        new ResetPassword(identityProvider, {
          email: request.email,
          code: request.code,
          newPassword: request.newPassword,
        }).execute(),
    }),
};
