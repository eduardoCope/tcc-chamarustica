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
    private enderecoService: EnderecoService,
  ) { }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.enderecoService.addEndereco(form.value)
        .then(() => {
          alert('Endereço registrado com sucesso! 🎉');
          form.reset();
        })
        .catch((error) => {
          console.error('Erro ao salvar endereço:', error);
        });
    }
  }

}