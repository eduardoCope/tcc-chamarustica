import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { ProdutoService } from '../services/produto.service';
import { CategoriaService } from '../services/categoria.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastroprodutoadm',
  templateUrl: './cadastroprodutoadm.page.html',
  styleUrls: ['./cadastroprodutoadm.page.scss'],
})
export class CadastroprodutoadmPage implements OnInit {

  isModalOpen = false;

  public file: any = {};

  isLoading: boolean = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor( public crudService: CrudService,
              public produtoService: ProdutoService,
              public categoriaService: CategoriaService,
              public storage: Storage,
              private router: Router,

    private _message: MessageService
  ) {

    console.log(localStorage.getItem("usuario"))
    if(localStorage.getItem("usuario")){
      let usuario:any = null;
      usuario = JSON.parse(localStorage.getItem("usuario") || '{}')

      if(usuario.tipo == "adm") {
        this.router.navigate(["/cadastroprodutoadm"])
      } else{
        this.router.navigate(["/login"])
      }

    } else{
      this.router.navigate(["/login"])
    }


    this.getProdutos();
    this.getCategorias();
   }

  ngOnInit() {
  }

  onWillDismiss(event: any) {
    this.isModalOpen = false;
  }

  salvarCategoria() {
    this.crudService.insert(this.categoriaService.categoria, 'categorias');
    this.getCategorias();
  }

  getCategorias(){
    this.crudService.fetchAll('categorias')
    .then(lista_categorias => {
      console.log(lista_categorias);
      this.categoriaService.categorias = lista_categorias;
    })
  }



  setCategoria(event: any) {
    this.produtoService.produto.categoria = event.detail.value;
  }
  
    salvar() {
      if (this.produtoService.produto.id) {
        this.crudService.update(this.produtoService.produto.id, this.produtoService.produto, 'produtos');
      }

      if (!this.produtoService.produto.id) {
        console.log(this.produtoService.produtos);
        this.crudService.insert(this.produtoService.produto, 'produtos');
        this.getProdutos();
      }
    }

    atualizar(produto: any) {
      this.produtoService.produto = produto;
    }

    remover(id: any) {
      this.crudService.remove( id ,'produtos')
      .then(() => {
        this.getProdutos();
      })
  }

  getProdutos(){
    this.crudService.fetchAll('produtos')
    .then(lista_produtos => {
      console.log(lista_produtos);
      this.produtoService.produtos = lista_produtos;
    })
  }

  fazerUpload(event: any) {
    this.file = event.target.files[0];
    if (!this.file.name) {
      this._message.show('Favor selecionar o arquivo a ser enviado', 5000);
      return;
    }

    // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(this.storage, this.file.name);
      const uploadTask = uploadBytesResumable(storageRef, this.file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log('Upload is ' + progress + '% done');

          switch (snapshot.state) {
            case 'paused':
              console.log('Envio pausado');
              break;
            case 'running':
              console.log('Carregando arquivo');
              this._message.show('Carregando arquivo, favor aguardar!', 2000);
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              console.log('Não enviado! Usuário sem permissão');
              this._message.show('Não enviado! Usuário sem permissão!');
              break;
            case 'storage/canceled':
              // User canceled the upload
              console.log('Não enviado: upload cancelado');
              this._message.show('Erro: Upload cancelado!');
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              console.log('Não enviado. Ocorreu um erro desconhecido!');
              this._message.show('Oops! Ocorreu um erro desconhecido!');
              break;
          }

          console.log('Arquivo enviado');
          this._message.show('Arquivo enviado com sucesso!');
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('Url do arquivo é ' + downloadURL)
            this.produtoService.produto.imagem = downloadURL
          });
        }
      );
  }







}

