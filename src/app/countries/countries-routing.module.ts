// Importaciones necesarias de Angular para módulos y enrutamiento
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importación de componentes para las páginas
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

// Definición de rutas para el enrutamiento
const routes: Routes = [
  {
    path: 'by-capital', // Ruta para la página por capital
    component: ByCapitalPageComponent // Componente que se renderizará para esta ruta
  },
  {
    path: 'by-country', // Ruta para la página por país
    component: ByCountryPageComponent // Componente que se renderizará para esta ruta
  },
  {
    path: 'by-region', // Ruta para la página por región
    component: ByRegionPageComponent // Componente que se renderizará para esta ruta
  },
  {
    path: 'by/:id', // Ruta con parámetro (el ID del país)
    component: CountryPageComponent // Componente que se renderizará para esta ruta
  },
  {
    path: '**', // Ruta de comodín para todas las rutas no coincidentes
    redirectTo: 'by-capital' // Redirigir a la página por capital
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes) // Importación de las rutas en el módulo
  ],
  exports: [
    RouterModule // Exportación del módulo de enrutamiento
  ],
})
export class CountriesRoutingModule { }
