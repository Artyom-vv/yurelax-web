import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable()
export class SkinsService {
  constructor(
    private http: HttpClient
  ) {
  }

  getAvatar(login: string): Observable<string> {
    return of('')
  }
}
