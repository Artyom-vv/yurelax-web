import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {map, Observable} from "rxjs";
import {StatisticsService} from "../services/statistics.service";

export function ExistingStatisticsValidator(statisticsService: StatisticsService, inverse: boolean = false): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const form = control.parent?.getRawValue();
    return statisticsService.checkStatisticsExists(form["key"]).pipe(map((value) => {
      if (inverse) return value ? null : { notExist: true }
      return value ? { alreadyUse: true } : null
    }));
  };
}
