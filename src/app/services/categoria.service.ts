import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoria: any = {
    nome: null
  }

  categorias: any = [
    {nome: "Lanche"}, {nome: "Bebida"}, {nome: "Outro"}
  ]

  constructor() { }
}
