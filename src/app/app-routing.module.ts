import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: 'details/:id', component: PokemonDetailsComponent },
  {
    path: 'pokemons',
    loadChildren: () =>
      import('./pokemon/pokemon.module').then((m) => m.PokemonModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
