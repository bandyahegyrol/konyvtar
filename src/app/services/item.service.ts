import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Item } from 'src/app/models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
    constructor(private http: HttpClient) { }

    async loadAll(pattern: string) {
      return firstValueFrom(this.http.get<Item[]>('/api/items', {
        params: {
            pattern: pattern
        }
      }));
    }

    async loadFree() {
      return firstValueFrom(this.http.get<Item[]>('/api/items/free'));
    }

    async loadOne(id: number) {
      return firstValueFrom(this.http.get<Item>('/api/items/' + id));
    }

    async addItem(item: any) {
      return firstValueFrom(this.http.post<Item>('/api/items', item))
    }

    async updateItem(item: any) {
      return firstValueFrom(this.http.put<Item>('/api/items', item))
    }

    async deleteItem(id: number) {
      return firstValueFrom(this.http.delete<any>('/api/items/' + id));
    }
}