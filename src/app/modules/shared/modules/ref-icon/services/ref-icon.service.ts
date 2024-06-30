import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RefIconService {
  private icons: Record<string, string> = {};

  constructor(private http: HttpClient) {}
  public async registerIconFromAssets(name: string, path: string): Promise<void> {
    const svgText = await this.http.get(path, { responseType: 'text' as 'json' }).toPromise() as string;
    this.registerIcon(name, svgText);
  }

  public registerIcon(name: string, svg: string): void {
    this.icons[name] = svg;
  }

  public getIcon(name: string): string {
    return this.icons[name];
  }
}
