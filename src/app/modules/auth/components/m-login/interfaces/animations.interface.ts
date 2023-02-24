import {AnimationPlayer} from "@angular/animations";

export interface AnimationsInterface {
  fade: AnimationInterface
  appearance: AnimationInterface
}
export interface AnimationInterface {
  greeting: AnimationPlayer,
  error: AnimationPlayer,
  loading: AnimationPlayer,
  success: AnimationPlayer
}
