import { Component } from '@angular/core';
import { ProductsService } from '../../services/producto.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBarComponent {
  constructor(private productsService: ProductsService) {}

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.productsService.updateSearchTerm(input.value);
  }
}
