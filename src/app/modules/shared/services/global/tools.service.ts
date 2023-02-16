import {Injectable} from "@angular/core";

@Injectable()
export class ToolsService {
  public tokenExpired(token: string): boolean {
    if (token) {
      const expiry = (JSON.parse(window.atob(token.split('.')[1]))).exp;
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
    return false
  }
}
