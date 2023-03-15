import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class ModelService {
  constructor(
    private http: HttpClient
  ) {
  }

  getModel(name: string): Observable<any> {
    return this.http.get(`assets/obj/${name}.obj`, {responseType: 'blob'}).pipe(
      catchError((err) => throwError(err))
    )
  }
}
