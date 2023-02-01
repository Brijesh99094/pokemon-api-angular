import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PokemonModel } from '../models/pokemon.model';
import { PokemonService } from './../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
})
export class PokemonDetailsComponent implements OnInit {
  private id: number;
  protected pokemon: PokemonModel | null;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location,
    private notificationService: NotificationService
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemon = null;
  }

  ngOnInit(): void {
    const getPokemonApiResponseHandler = (foundPokemon: PokemonModel) => {
      this.pokemon = foundPokemon;
    };
    const getPokemonApiErrorHandler = (error: any) => {
      this.notificationService.showNotification(
        'error',
        error.message || 'Error Occured'
      );
    };

    this.pokemonService.getPokemon(this.id).subscribe({
      next: getPokemonApiResponseHandler.bind(this),
      error: getPokemonApiErrorHandler.bind(this),
    });
  }

  goBack(): void {
    this.location.back();
  }
}
