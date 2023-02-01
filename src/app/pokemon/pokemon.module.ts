import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { AddPokemonModalComponent } from './add-pokemon-modal/add-pokemon-modal.component';
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonRoutingModule } from './pokemon-routing.module';

@NgModule({
  declarations: [
    PokemonCardComponent,
    PokemonListComponent,
    AddPokemonComponent,
    PokemonDetailsComponent,
    AddPokemonModalComponent,
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    NgbPaginationModule,
    ReactiveFormsModule,
  ],
})
export class PokemonModule {}
