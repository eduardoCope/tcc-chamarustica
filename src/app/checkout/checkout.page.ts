import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { CarrinhoService } from '../services/carrinho.service';
import { EnderecoService } from '../services/endereco.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {


  constructor(
    public produtoService:ProdutoService,
    public carrinhoService:CarrinhoService,
    public enderecoService: EnderecoService,
  ) { }

  ngOnInit() {}

 


}