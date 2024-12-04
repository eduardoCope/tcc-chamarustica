import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  constructor(private firestore: AngularFirestore) {}

  addEndereco(data: any) {
    return this.firestore.collection('enderecos').add(data);
  }
}