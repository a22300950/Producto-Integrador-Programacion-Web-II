import {Injectable, inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/producto.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/products';
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}