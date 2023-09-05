import { CountriesService } from './../../services/countries.service';
import { Country } from './../../interfaces/country';
import { Component, OnInit } from '@angular/core';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit{

  public countries : Country[] = [];
  public regions: Region[] = [ 'Africa', 'America', 'Asia', 'Europe', 'Oceania']; //declaramoa el array estrico
  public selectedRegion?: Region; //preguntamos si hay una region seleccionada para así usara en el metodo searchByRegin e igualarla a region del archivo html y que tome sus estilos
  //public initialValue: string = '';

  constructor(private countriesService : CountriesService){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

// Definición de la función searchaRegion que acepta un parámetro de tipo string llamado 'term'
searchByRegion(region: Region): void {
  this.selectedRegion = region;
  // Llamada a un método llamado 'searchRegion' del servicio CountriesService y pasando el parámetro 'term'
  this.countriesService.searchRegion(region)
    .subscribe(countries => {
      // Una vez que la llamada al servicio se complete y los datos estén disponibles, se ejecuta esta función de devolución de llamada.
      // Los datos recibidos, que parecen ser una lista de países, se asignan a la propiedad 'countries' de la instancia actual.
      this.countries = countries;
    });
}



}
