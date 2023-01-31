import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonModel } from './../model/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  baseUrl = 'http://localhost:3000/pokemon';

  constructor(private http: HttpClient) {}
  getPokemons(pokemonPage?: number, noOfPokemonsPerPage?: number) {
    let url = this.baseUrl;
    if (noOfPokemonsPerPage && pokemonPage) {
      url += `?_limit=${noOfPokemonsPerPage}&_page=${pokemonPage}`;
    }
    return this.http.get<PokemonModel[]>(url);
  }

  postPokemons(pokemon: PokemonModel) {
    return this.http.post<PokemonModel>(this.baseUrl, pokemon);
  }

  getPokemon(id: number) {
    return this.http.get<PokemonModel>(this.baseUrl + `/${id}`);
  }
}
