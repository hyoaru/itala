export type ResetPasswordRequest = {
  email: string;
  code: string;
  newPassword: string;
};
