import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsuariosService } from './services/usuarios.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor/interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [UsuariosService,
    //CONFIGURACION BASICA DEL INTERCEPTOR
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true //Para que este pendiente de todo las peticiones que se esta haciendo 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
