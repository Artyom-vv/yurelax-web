export interface RegisterRequestInterface {
  login: string;
  email: string;
  userInvitedId: string | null;
  password: string;
  passwordRepeat: string;
}
