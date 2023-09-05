// Importaciones necesarias desde Angular y RxJS
import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box', // Selector del componente s
  templateUrl: './search-box.component.html', // Plantilla del componente
  styles: [] // Estilos para el componente
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>(); // Subject para el debounce
  private debouncerSuscription?: Subscription; // Suscripción al Subject

  @Input()
  public placeholder: string = ''; // Propiedad de entrada para el marcador de posición del cuadro de búsqueda

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>(); // Evento de salida para el valor del cuadro de búsqueda

  @Output()
  public onDebounce = new EventEmitter<string>(); // Evento de salida para el valor después del debounce


  ngOnInit(): void {
    // Se suscribe al debouncer
    this.debouncerSuscription = this.debouncer
      .pipe(debounceTime(300)) // Aplica un tiempo de espera de 300 ms
      .subscribe(value => {
        this.onDebounce.emit(value); // Emite el valor después del debounce
      });
  }

  ngOnDestroy(): void {
    // Se cancela la suscripción al debouncer al destruir el componente
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue(value: string): void {
    this.onValue.emit(value); // Emite el valor del cuadro de búsqueda
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm); // Envía el término de búsqueda al debouncer
  }
}
