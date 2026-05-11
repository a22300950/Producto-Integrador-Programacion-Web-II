import {  AfterViewInit,  Component,  ElementRef,  ViewChild,  inject} from '@angular/core';
import { CarritoService } from '../../../app/services/carrito.service';
import { PaypalService } from '../../services/paypal.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ReciboComponent } from '../../../app/components/recibo/recibo';

declare const paypal: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.html',
  imports: [CurrencyPipe, RouterLink, ReciboComponent]
})

export class CheckoutComponent implements AfterViewInit {
  private carritoService = inject(CarritoService);
  private paypalService = inject(PaypalService);
  @ViewChild('paypalButtonContainer', { static: false }) paypalButtonsContainer!: ElementRef;

  carrito = this.carritoService.productos();
  total = this.carritoService.total();

  mensaje = '';

    ngAfterViewInit(): void {
        this.renderPaypalButtons();
    }

    private renderPaypalButtons() {
        if(this.carrito.length === 0) {
            return;
        }

        if(typeof paypal === 'undefined') {
            this.mensaje = 'Error al cargar PayPal. Por favor, recarga la página.';
            return;
        }

        if(!this.paypalButtonsContainer) {
            return;
        }

        this.paypalButtonsContainer.nativeElement.innerHTML = '';

        paypal.Buttons({
            createOrder: async () => {
                try {
                    const response = await firstValueFrom(this.paypalService.crearOrden({
                        items: this.carrito,
                        total: this.total
                    }));
                    return response.id;
                } catch (error) {
                    console.error('Error al crear orden:', error);
                    this.mensaje = 'Error al procesar el pago. Por favor, intenta de nuevo.';
                    throw error;
                }
            },
            onApprove: async (data: any) => {
                try {
                    const capture = await firstValueFrom(this.paypalService.capturarOrden(data.orderID));

                    console.log('Pago exitoso:', capture);
                    //this.carritoService.exportarXML();
                    window.print();
                    this.mensaje = '¡Pago exitoso! El recibo se descargó automáticamente.';
                    this.carritoService.vaciar();
                    this.paypalButtonsContainer.nativeElement.innerHTML = '';
                } catch (error) {
                    console.error('Error al capturar orden:', error);
                    this.mensaje = 'Error al procesar el pago. Por favor, intenta de nuevo.';
                }
            },

            onCancel: () => {
                this.mensaje = 'Pago cancelado. Puedes intentar de nuevo.';
            },

            onError: (err: any) => {
                console.error('Error en PayPal:', err);
                this.mensaje = 'Error al procesar el pago. Por favor, intenta de nuevo.';
            }
        }).render(this.paypalButtonsContainer.nativeElement);
    }
}