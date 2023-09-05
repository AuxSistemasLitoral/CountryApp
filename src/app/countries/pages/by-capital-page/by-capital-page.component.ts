// Importaciones necesarias
import { CountriesService } from './../../services/countries.service';
import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page', // Selector del componente
  templateUrl: './by-capital-page.component.html', // Ruta de la plantilla HTML asociada al componente
  styles: [] // Estilos específicos del componente (opcional)
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = []; // Arreglo de países
  public isLoading: boolean = false; // Bandera para el estado de carga
  public initialValue: string = ''; // variable para capturar el valor que llega en el TERM (valor de busqueda del usuario)

  // Constructor del componente que recibe el servicio CountriesService
  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;//con esta implementación puedo ya recuperar la busqueda es decir los countries
    this.initialValue = this.countriesService.cacheStore.byCapital.term; // con esto se puede recuperar la busqueda y llevarlo a a la variable creada en OnInit
  }

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
