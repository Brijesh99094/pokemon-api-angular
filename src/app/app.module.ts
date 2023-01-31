import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { NotificationComponent } from './notification/notification.component';
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddPokemonModalComponent } from './add-pokemon-modal/add-pokemon-modal.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PokemonCardComponent,
    PokemonListComponent,
    NotificationComponent,
    AddPokemonComponent,
    AboutPageComponent,
    PokemonDetailsComponent,
    AddPokemonModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
