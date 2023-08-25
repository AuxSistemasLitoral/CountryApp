// Importaciones necesarias
import { CountriesService } from './../../services/countries.service';
import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page', // Selector del componente
  templateUrl: './by-capital-page.component.html', // Ruta de la plantilla HTML asociada al componente
  styles: [] // Estilos específicos del componente (opcional)
})
export class ByCapitalPageComponent {

  public countries: Country[] = []; // Arreglo de países
  public isLoading: boolean = false; // Bandera para el estado de carga

  // Constructor del componente que recibe el servicio CountriesService
  constructor(private countriesService: CountriesService) {}

  // Función para buscar países por capital
  searchByCapital(term: string): void {
    this.isLoading = true; // Marca isLoading como verdadero

    // Llama al servicio de búsqueda por capital
    this.countriesService.searchCapital(term)
      .subscribe(countries => {
        this.countries = countries; // Asigna los países obtenidos al arreglo
        this.isLoading = false; // Marca isLoading como falso al terminar la búsqueda
      });
  }
}
