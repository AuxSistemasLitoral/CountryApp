import { Country } from './../../interfaces/country';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CountriesService } from '../../services/countries.service';


@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',  //// Ruta de la plantilla HTML asociada al componente
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

public country?:  Country; // País seleccionado

  constructor(
    private activatedRoute: ActivatedRoute, // Servicio para acceder a los parámetros de la URL
    private countriesService: CountriesService, // Servicio para obtener información de los países
    private router: Router, // Servicio de enrutamiento
    ){}

  ngOnInit(): void {
   this.activatedRoute.params
    .pipe(
      switchMap(({id})=> this.countriesService.searchCountryByAlphaCode(id)), // Obtiene información del país por su código alfa
    )
    .subscribe(country=>{
      if(!country) return this.router.navigateByUrl(''); // Si no se encuentra el país, redirige a la página principal
      return this.country = country; // Asigna el país obtenido al atributo "country"
      //return;
    })
  }

}
