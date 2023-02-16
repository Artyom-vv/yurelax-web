import { Injectable } from '@angular/core'

@Injectable()
export class PersistenceService {
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.error('Ошибка сохранения в localStorage', e)
    }
  }

  get(key: string): any {
    try {
      const data: string | null = localStorage.getItem(key);
      if (data) return JSON.parse(data)
      return data
    } catch (e) {
      console.error('Ошибка при получении данных с localStorage', e)
      return null
    }
  }
}
