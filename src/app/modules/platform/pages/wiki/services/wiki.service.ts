import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {WikiNavigation, WikiPage} from "../interfaces/wiki.interface";
import {environment} from "../../../../../../environments/environment";

@Injectable()
export class WikiService {

  public loading$ = new BehaviorSubject<boolean>(false)

  constructor(
    private http: HttpClient
  ) {
  }

  getNavigation(): Observable<WikiNavigation> {
    return this.http.get<WikiNavigation>(`${environment.apiUrl}/wikipedia/navigation`)
  }

  getPage(pageName: string): Observable<WikiPage> {
    return this.http.get<WikiPage>(`${environment.apiUrl}/wikipedia/${pageName}`)
  }

  update(): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/wikipedia/actualize`, null)
  }
}
