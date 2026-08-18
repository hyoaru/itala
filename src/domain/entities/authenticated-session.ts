interface AuthenticatedSessionProps {
  accessToken: string;
  idToken: string;
  refreshToken: string;
}

export class AuthenticatedSession {
  public readonly accessToken: string;
  public readonly idToken: string;
  public readonly refreshToken: string;

  public constructor(props: AuthenticatedSessionProps) {
    this.accessToken = props.accessToken;
    this.idToken = props.idToken;
    this.refreshToken = props.refreshToken;
  }
}
