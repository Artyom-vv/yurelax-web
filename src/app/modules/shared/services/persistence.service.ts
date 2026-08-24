import {isPlatformBrowser} from '@angular/common';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core'

@Injectable()
export class PersistenceService {
  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  set(key: string, data: any): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.error('Ошибка сохранения в localStorage', e)
    }
  }

  get(key: string): any {
    if (!isPlatformBrowser(this.platformId)) return null;
    try {
      const data: string | null = localStorage.getItem(key);
      if (data) return JSON.parse(data)
      return data
    } catch (e) {
      console.error('Ошибка при получении данных с localStorage', e)
      return null
    }
  }

  remove(key: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Ошибка удаления данных из localStorage', e)
    }
  }
}
