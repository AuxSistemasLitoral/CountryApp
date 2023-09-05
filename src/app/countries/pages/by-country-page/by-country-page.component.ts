// Importaciones necesarias
import { Country } from './../../interfaces/country';
import { CountriesService } from './../../services/countries.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-by-country-page', // Selector del componente
  templateUrl: './by-country-page.component.html', // Ruta de la plantilla HTML asociada al componente
  styles: []

})
export class ByCountryPageComponent  implements OnInit{

  public countries: Country[] = []; // Arreglo de países
  public initialValue: string = '';

  // Constructor del componente que recibe el servicio CountriesService
  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

  // Función para buscar países por su nombre
  searchByCountry(term: string): void {
    // Llama al servicio de búsqueda por nombre de país
    this.countriesService.searchCountry(term)
      .subscribe(countries => {
        this.countries = countries; // Asigna los países obtenidos al arreglo
      });
  }
}

