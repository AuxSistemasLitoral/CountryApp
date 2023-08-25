// Importaciones necesarias
import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

// Decorador del componente
@Component({
  selector: 'countries-table', // Selector personalizado para usar el componente
  templateUrl: './country-table.component.html', // Ruta de la plantilla HTML asociada al componente
  styles: [
    `img {
      width: 25px;
    }`
  ]
})
export class CountryTableComponent {

  @Input() // Decorador de entrada, permite pasar datos al componente desde su contenedor
  public countries: Country[] = []; // Arreglo de objetos de tipo 'Country' que se pasa al componente

  // Aquí podrían añadirse más propiedades y métodos relacionados con el componente
}
