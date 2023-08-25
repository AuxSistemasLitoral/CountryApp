// Importaciones necesarias
import { Country } from './../../interfaces/country';
import { CountriesService } from './../../services/countries.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-by-country-page', // Selector del componente
  templateUrl: './by-country-page.component.html', // Ruta de la plantilla HTML asociada al componente
  styles: [] // Estilos específicos del componente (opcional)
})
export class ByCountryPageComponent {

  public countries: Country[] = []; // Arreglo de países

  // Constructor del componente que recibe el servicio CountriesService
  constructor(private countriesService: CountriesService) {}

  // Función para buscar países por su nombre
  searchByCountry(term: string): void {
    // Llama al servicio de búsqueda por nombre de país
    this.countriesService.searchCountry(term)
      .subscribe(countries => {
        this.countries = countries; // Asigna los países obtenidos al arreglo
      });
  }
}
