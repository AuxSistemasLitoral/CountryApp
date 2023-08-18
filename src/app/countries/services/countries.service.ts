import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  //private apiCountr: string =  'https://restcountries.com/v3.1'

  constructor(private httpClient: HttpClient) { }

  searchCapital(term: string): Observable<Country[]> { //term sería el query o término de búsqueda

    const url = `${ this.apiUrl}/capital/${term}`; //url sería la api que se trae

    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError(() => of([]))
      //tap(countries => console.log('pasó por el "tap," ', countries))
    );
    //otra opcion sería
   //return this.httpClient.get<Country[]>(`${this.apiUrl}/capital/${term}`);
  }

  searchCoutry(term: string): Observable<Country[]> {
    const url = `${ this.apiUrl}/country/${term}`;
    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError(() => of([]))
    );
  }

}
