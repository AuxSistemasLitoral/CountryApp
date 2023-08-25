import { CountriesService } from './../../services/countries.service';
import { Country } from './../../interfaces/country';
import { Component } from '@angular/core';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {
  public countries : Country[] = [];

  constructor(private CountriesService : CountriesService){}

// Definición de la función searchaRegion que acepta un parámetro de tipo string llamado 'term'
searchByRegion(term: string): void {
  // Llamada a un método llamado 'searchRegion' del servicio CountriesService y pasando el parámetro 'term'
  this.CountriesService.searchRegion(term)
    .subscribe(countries => {
      // Una vez que la llamada al servicio se complete y los datos estén disponibles, se ejecuta esta función de devolución de llamada.
      // Los datos recibidos, que parecen ser una lista de países, se asignan a la propiedad 'countries' de la instancia actual.
      this.countries = countries;
    });
}



}
