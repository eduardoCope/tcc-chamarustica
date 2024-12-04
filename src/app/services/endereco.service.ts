import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  constructor() {}

 endereco= [
  {
    nome: null,
    telefone: null,
    CEP: null,
    numero: null,
    complemento: null,
    delivery: true
  }
 ]
}