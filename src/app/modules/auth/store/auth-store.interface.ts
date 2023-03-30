export type RecoveringPasswordType = 'verify' | 'recover' | null;

export interface AuthState {
  isWaitingForMA: boolean
  isRecoveringPasswordStep: RecoveringPasswordType
  recoveringPasswordEmail: string
}
export const DEFAULT_STATE: AuthState = {
  isWaitingForMA: false,
  isRecoveringPasswordStep: null,
  recoveringPasswordEmail: ''
};
