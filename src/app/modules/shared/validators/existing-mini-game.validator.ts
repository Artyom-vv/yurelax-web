import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {map, Observable} from "rxjs";
import {StatisticsService} from "../services/statistics.service";
import {MiniGamesService} from "../services/mini-games.service";

export function ExistingMiniGameValidator(miniGamesService: MiniGamesService, inverse: boolean = false): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const form = control.parent?.getRawValue();
    return miniGamesService.checkMiniGameExists(form["miniGameKey"]).pipe(map((value) => {
      if (inverse) return value ? null : { notExist: true }
      return value ? { alreadyUse: true } : null
    }));
  };
}
