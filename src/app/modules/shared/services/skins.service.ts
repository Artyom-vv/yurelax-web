import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable,  switchMap} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable()
export class SkinsService {
  constructor(
    private http: HttpClient
  ) {
  }

  getAvatar(login: string | undefined): Observable<string> {
    return this.http.get(`${environment.minecraftApiUrl}/uuid/${login}`).pipe(
      switchMap((json) => {
        console.log(json)
        const uuid = ''
        return this.http.get(`${environment.crafatarApiUrl}/renders/head/${uuid}`).pipe(
          map((data) => {
            console.log(data)
            return ''
          })
        )
      })
    )
  }
}
