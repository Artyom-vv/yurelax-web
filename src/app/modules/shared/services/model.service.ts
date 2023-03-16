import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, switchMap, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {environment} from "../../../../environments/environment";

@Injectable()
export class ModelService {
  constructor(
    private http: HttpClient
  ) {
  }

  getModel(name: string): Observable<any> {
    return this.http.get(`${environment.publicUrl}/models/${name}.obj`, {responseType: 'blob'}).pipe(
      switchMap((model) => this.http.get(`${environment.publicUrl}/models/${name}.mtl`, {responseType: 'blob'}).pipe(
        map((mtl) => ({
          model,
          mtl
        }))
      )),
      catchError((err) => throwError(err))
    )
  }
}
