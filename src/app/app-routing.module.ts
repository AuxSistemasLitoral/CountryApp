import {RouterModule, Routes } from '@angular/router';
import { NgModule, } from '@angular/core';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';


const routes : Routes = [
 /* {
    path: '',
    component: HomePageComponent
  },*/
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: 'countries',
    loadChildren: () => import('./countries/countries.module') //se define una funcion de carga para recibir el impor y resuelve una promesa (es para darle el path y poder direccionar el router)
                  .then(m => m.CountriesModule)
                  //con esto le asignamos un path al loadChildren con todas la paginas de countries para que cargue cada uno de los modulos declarados en el
  },

  {
    path: '**',
    redirectTo: 'countries'
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]

})
export class AppRoutingModule{ }
