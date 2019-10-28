import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
//La clase interceptorService no implementa un metodo que necesita httpInterceptor para que funcione
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  //Para que funcione , el metodo se coloca aqui -> tiene que regresar algo especifico
  //Importar la interface del http interceptor
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = new HttpHeaders({

      'token-usuario': 'ABCSDSDW122342'
    });
    //Creamos una constante reqClone
    //Realiza un clon de la misma 
    const reqClone = req.clone({
      headers: headers
    });

    // throw new Error("Method not implemented.");
    console.log('Paso por el interceptor');
    /*Cuando se utiliza la req este ya deja de poderse utilizar , es como que mutara y no lo pueden 
    volver a utilizar como para hacer una peticion por lo cual se tendria que clonarla y a la hora de clonarla
    hay que clonarla antes de que se manipulada , eso es basicamente todo ; porque una req que ya se manipula ya no lo
    podemos volver a llamar por dercirlo asi */

    return next.handle(reqClone).pipe(
      catchError(this.manejarError)
    );
  }
  manejarError(error: HttpErrorResponse) {
    console.log('Sucesdio el error');

    //Nos muestra lo que recibe el error del throwError, el err es de tipo httperrorresponse
    console.warn(error);//aparece en amarillo 
    return throwError('Error supervisado');
  }

  /*Es como una valvula abierta que todo lo que pase por el http entraria por el interceptor y a su vez
  sigue fluyendo no hace ningun control o proceso o procedimientos por lo momentos , simplemente lo esta viendo y lo
  esta dejando pasar */

  /*req es que lo q se esta solicitando y es de tipo httprequest que resuelve cualquier cosa por eso lo mantiene como any */
  /*next es el siguiente paso que deberia de hacer cuando ya realizamos todo el trabajo en este interceptor y es de tipo HttpHandeler */
  /*Sigue el tipado de retorno del interceptor que tambien es opcional pero esto nos va ayudar a asegurarnos que vamos a retornar
  algo que es totalmente valido para mi metodo de interceptor y esto regresa un observable*/
  /*Es un observable que resuelve un evento http que ese evento tambien resuelve cualquier cosa */
}
