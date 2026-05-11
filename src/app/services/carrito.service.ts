import { Injectable, signal } from '@angular/core';
import { Product } from '../models/producto.model';

export const DATOS_EMISOR = {
  nombre: 'REFACCIONARIA LA ESCONDIDA',
  rfc: 'RELE800101ABC', 
  direccion: 'Av. Principal #123, Col. Centro',
  cp: '45000',
  ciudad: 'Zapopan, Jalisco',
  regimen: '612 - Personas Físicas con Actividades Empresariales'
};

@Injectable({ providedIn: 'root' })
export class CarritoService {
  
  private productosSignal = signal<Product[]>([]);

  productos = this.productosSignal.asReadonly();

  agregar(producto: Product) {
    this.productosSignal.update(lista => [...lista, producto]);
  }

  quitar(id: number) {
    this.productosSignal.update(lista => {
      const index = lista.findIndex(p => p.id === id);

      if (index !== -1) {
        const nuevaLista = [...lista];
        nuevaLista.splice(index, 1);   
        return nuevaLista;             
      }

      return lista;
    });
  }

  vaciar() {
    this.productosSignal.set([]);
  }

  total(): number {
    return this.productosSignal().reduce((acc, p) => acc + p.price, 0);
  }

  exportarXML() {
    const productos = this.productosSignal();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<recibo>\n`;

    for (const p of productos) {
      xml += `  <producto>\n`;
      xml += `    <id>${p.id}</id>\n`;
      xml += `    <nombre>${this.escapeXml(p.name)}</nombre>\n`;
      xml += `    <precio>${p.price}</precio>\n`;
      if (p.description) {
        xml += `    <descripcion>${this.escapeXml(p.description)}</descripcion>\n`;
      }
      xml += `  </producto>\n`;
    }

    xml += `  <total>${this.total()}</total>\n`;
    xml += `</recibo>`;

    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'recibo.xml';
    a.click();

    URL.revokeObjectURL(url);
  }

  private escapeXml(value: string): string {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&apos;');
  }
}
