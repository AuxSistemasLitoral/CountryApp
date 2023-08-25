// Importaciones necesarias
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, delay } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' }) // Indica que este servicio se proporciona en el nivel de la aplicación
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'; // URL base de la API de países

  constructor(private httpClient: HttpClient) { }

  // Función privada para realizar la solicitud de países a la API
  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([])), // Manejo de errores en la solicitud
        // delay(2000) // Retardo simulado de 2 segundos (opcional)
      );
  }

  // Función para buscar países por capital
  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`; // URL específica para buscar por capital
    return this.getCountriesRequest(url); // Realizar la solicitud a la API
  }

  // Función para buscar países por nombre
  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`; // URL específica para buscar por nombre
    return this.getCountriesRequest(url); // Realizar la solicitud a la API
  }

  // Función para buscar países por región
  searchRegion(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${term}`; // URL específica para buscar por región
    return this.getCountriesRequest(url); // Realizar la solicitud a la API
  }

  // Función para buscar un país por su código alfa
  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`; // URL específica para buscar por código alfa
    return this.httpClient.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null), // Obtener el primer país o nulo
        catchError(() => of(null)) // Manejo de errores en la solicitud
      );
  }
}
