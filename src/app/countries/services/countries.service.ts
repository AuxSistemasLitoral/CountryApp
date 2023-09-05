// Importaciones necesarias
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' }) // Indica que este servicio se proporciona en el nivel de la aplicación
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'; // URL base de la API de países

  public cacheStore: CacheStore = {
    byCapital:    {term: '', countries: []}, //el método cachStore guarda en el term el terino de busqueda y en los countries lo que encontro con el termino de busqueda
    byCountries:  {term: '', countries: []},
    byRegion:     {region: '', countries: []},
  }
  // se define un arreglo de arreglos para allí almacenar info en cache y poder renderizar la información guardad de página en página, sin necesidad de hacer una nueva búsqueda

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }


  /**
 * Guarda el contenido actual del objeto caché en el almacenamiento local del navegador.
 * Esto permite conservar los datos en la memoria del navegador incluso después de cerrar la ventana o pestaña.
 */
private saveToLocalStorege() {
  // Serializa el objeto caché a formato JSON y lo guarda en el almacenamiento local.
  localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
}


 /**
 * Carga el contenido del almacenamiento local del navegador en el objeto caché si está disponible.
 * Esto permite restaurar los datos previamente guardados en el objeto caché.
 */
private loadFromLocalStorage() {
  // Comprueba si existe un valor en el almacenamiento local con la clave 'cacheStore'.
  if (!localStorage.getItem('cacheStore')) return;

  // Recupera el valor JSON del almacenamiento local y lo parsea en el objeto caché.
  this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
}



   // Función privada para realizar la solicitud de países a la API
  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
      );
  }

  // Función para buscar países por capital
  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`; // URL específica para buscar por capital
    return this.getCountriesRequest(url)// aca tenemos el observable y con el puedo disparar rjx de nuevo
    .pipe(
      tap( countries => this.cacheStore.byCapital = {term, countries}),
      tap(() => this.saveToLocalStorege()),
      // el tap tiene la informacion de la busqueda, que sería el TERM que es la busqueda y countries es lo que encontró
    ); // Realizar la solicitud a la API
  }

  // Función para buscar países por nombre
  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`; // URL específica para buscar por nombre
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byCountries = {term, countries}),
      tap(() => this.saveToLocalStorege()),
    ); // Realizar la solicitud a la API
  }

  // Función para buscar países por región
  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`; // URL específica para buscar por región
    return this.getCountriesRequest(url)
     .pipe(
       tap(countries => this.cacheStore.byRegion = {region, countries}),
       tap(() => this.saveToLocalStorege()),
    );// Realizar la solicitud a la API
  }

  // Función para buscar un país por su código alfa
  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`; // URL específica para buscar por código alfa
    return this.httpClient.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null), // Obtener el primer país o nulo
        catchError(() => of(null))
      );
  }
}
