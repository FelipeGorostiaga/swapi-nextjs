import { Character, Film, SwapiPagination } from "@/types";
import axios from "axios";

const swapiURL = "https://swapi.dev/api";

export const getFilms = (page: number, search?: string) => {
  const url = new URL(`${swapiURL}/films/`);
  url.searchParams.append("page", page.toString());

  if (search) {
    url.searchParams.append("search", search);
  }

  return axios.get<SwapiPagination<Film>>(url.toString());
};

export const getFilm = (id: number) => {
  return axios.get<Film>(`${swapiURL}/films/${id}/`);
};

export const getCharacters = (page: number, search?: string) => {
  const url = new URL(`${swapiURL}/people/`);
  url.searchParams.append("page", page.toString());

  if (search) {
    url.searchParams.append("search", search);
  }

  return axios.get<SwapiPagination<Character>>(url.toString());
};

export const getCharacter = (id: number) => {
  return axios.get<Character>(`${swapiURL}/people/${id}/`);
};
