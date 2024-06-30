import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {map, Observable, switchMap, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {SkinsUploadResponseInterface} from "../interfaces/old/skins-upload-response.interface";
import {catchError} from "rxjs/operators";

@Injectable()
export class SkinsService {
  constructor(
    private http: HttpClient
  ) {
  }

  uploadSkin(userId: string, file: File): Observable<SkinsUploadResponseInterface> {

    const data: string = JSON.stringify({userId});

    const formData: FormData = new FormData();
    formData.append('file', file)
    formData.append('data', data)

    return this.http.post<SkinsUploadResponseInterface>(`${environment.apiUrl}/skins/upload`, formData).pipe(
      catchError((err) => throwError(err))
    )
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
