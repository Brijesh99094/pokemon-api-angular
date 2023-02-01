import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonModel } from './../model/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  baseUrl = 'http://localhost:3000/pokemon';

  constructor(private http: HttpClient) {}
  getPokemons(
    pokemonPage?: number,
    noOfPokemonsPerPage?: number,
    searchQuery?: { [key: string]: string }
  ) {
    let url = this.baseUrl;
    let searchQueryString = '';
    let pagingQueryString = '';
    if (searchQuery) {
      const searchKeys: string[] = Object.keys(searchQuery);
      if (searchKeys.length) {
        for (let currQueryKey of searchKeys) {
          searchQueryString += `${currQueryKey}=${searchQuery[currQueryKey]}`;
        }
      }
    }
    if (noOfPokemonsPerPage && pokemonPage) {
      pagingQueryString = `_limit=${noOfPokemonsPerPage}&_page=${pokemonPage}`;
    }
    if (searchQueryString.length) {
      url += `?${searchQueryString}`;
    }

    if (pagingQueryString.length) {
      url += `${searchQueryString.length ? '&' : '?'}${pagingQueryString}`;
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
