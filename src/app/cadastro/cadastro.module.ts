import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CadastroPageRoutingModule } from './cadastro-routing.module';
import { CadastroPage } from './cadastro.page';
import { FooterModule } from '../shared/components/footer/footer.module';
import { HeaderModule } from '../shared/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroPageRoutingModule,
    FooterModule,
    HeaderModule
  ],
  declarations: [CadastroPage]
})
export class CadastroPageModule {}