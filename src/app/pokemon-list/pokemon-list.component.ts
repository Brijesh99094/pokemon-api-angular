import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../services/notification/notification.service';
import { PokemonModel } from './../model/pokemon.model';
import { PokemonService } from './../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  protected allPokemons: PokemonModel[];
  protected noOfPokemonsPerPage: number;
  protected currentPage: number;
  private isNeedToFetchPokemons: boolean;
  private currApiPage: number;
  private searchQuery: { [key: string]: string };

  constructor(
    private pokemonService: PokemonService,
    private notificationService: NotificationService,
    private router: ActivatedRoute
  ) {
    this.currApiPage = 1;
    this.isNeedToFetchPokemons = true;
    this.allPokemons = [];
    this.noOfPokemonsPerPage = 6;
    this.currentPage = 1;
    this.searchQuery = {};
  }

  resetPaginationItems() {
    this.allPokemons = [];
    this.currApiPage = 1;
    this.currentPage = 1;
    this.isNeedToFetchPokemons = true;
  }

  ngOnInit(): void {
    this.router.queryParamMap.subscribe({
      next: (data) => {
        const search: string | null = data.get('search');
        if (search) {
          if (isNaN(+search)) {
            this.searchQuery = {
              name: search,
            };
          } else {
            this.searchQuery = {
              id: search,
            };
          }
        } else {
          this.searchQuery = {};
        }
        this.resetPaginationItems();
        this.fetchPokemons();
      },
    });
  }

  addPokemonToList(newPokemon: PokemonModel) {
    // add pokemon only if current page or current page's next page hase low items then noOfPokemons per page
    if (
      Object.keys(this.searchQuery).length === 0 &&
      (this.allPokemons.slice(
        (this.currentPage - 1) * this.noOfPokemonsPerPage,
        this.currentPage * this.noOfPokemonsPerPage
      ).length < this.noOfPokemonsPerPage ||
        this.allPokemons.slice(
          this.currentPage * this.noOfPokemonsPerPage,
          this.currentPage * this.noOfPokemonsPerPage
        ).length < this.noOfPokemonsPerPage)
    )
      this.allPokemons = this.allPokemons.concat([newPokemon]);
  }

  pokemonApiErrorHandler = (error: any) => {
    this.notificationService.showNotification(
      'error',
      error.message || 'Error Occured'
    );
  };

  fetchPokemons() {
    const handleFetchPokemonsResponseApiHandler = (
      fetchedPokemons: PokemonModel[]
    ) => {
      if (
        fetchedPokemons.length === 0 ||
        fetchedPokemons.length < this.noOfPokemonsPerPage
      ) {
        this.isNeedToFetchPokemons = false;
      }
      this.allPokemons = this.allPokemons.concat(fetchedPokemons);
    };
    this.pokemonService
      .getPokemons(
        this.currApiPage++,
        this.noOfPokemonsPerPage * 2,
        this.searchQuery
      )
      .subscribe({
        next: handleFetchPokemonsResponseApiHandler.bind(this),
        error: this.pokemonApiErrorHandler.bind(this),
      });
  }

  protected handlePageChange() {
    if (
      this.isNeedToFetchPokemons &&
      this.currentPage === this.allPokemons.length / this.noOfPokemonsPerPage
    ) {
      this.fetchPokemons();
    }
  }
}
