export type RecoveringPasswordType = 'verify' | 'recover' | null;

export interface AuthState {
  MAKey: string
  isRecoveringPasswordStep: RecoveringPasswordType
  recoveringPasswordEmail: string
}
export const DEFAULT_STATE: AuthState = {
  MAKey: '',
  isRecoveringPasswordStep: null,
  recoveringPasswordEmail: ''
};
