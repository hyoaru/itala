import {
  ResetPassword,
  SendAccountVerification,
  SendPasswordReset,
  SignIn,
  SignUp,
  VerifyAccount,
  type ResetPasswordRequest,
  type SendAccountVerificationRequest,
  type SendPasswordResetRequest,
  type SignInRequest,
  type SignUpRequest,
  type VerifyAccountRequest,
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
  verifyAccount: () =>
    mutationOptions({
      mutationKey: [baseKey, "verify"],
      mutationFn: (request: VerifyAccountRequest) =>
        new VerifyAccount(identityProvider, {
          email: request.email,
          code: request.code,
        }).execute(),
    }),
  sendAccountVerification: () =>
    mutationOptions({
      mutationKey: [baseKey, "send_verification"],
      mutationFn: (request: SendAccountVerificationRequest) =>
        new SendAccountVerification(identityProvider, {
          email: request.email,
        }).execute(),
    }),
  sendPasswordReset: () =>
    mutationOptions({
      mutationKey: [baseKey, "request_password_reset"],
      mutationFn: (request: SendPasswordResetRequest) =>
        new SendPasswordReset(identityProvider, {
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
