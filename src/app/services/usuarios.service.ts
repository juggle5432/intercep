import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//Transformacion de informacion que se manda al navegador
import { map, catchError } from 'rxjs/operators';
//Tambien se poder importar el observable
//throwError es una objeto en si , no un operador
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {



  constructor(private http: HttpClient) { }

  getUsuarios() {
    //insert in this peticion page y quiero la pagina 1
    let params = new HttpParams().append('page', '1');
    params = params.append('nombre', 'Christian Bayovar');

    //Mandar el token por los headers ; pero yo tendria que implementar en cada uno de las peticiones que haga mi servicio , y yo
    //quiero ahorrarme ese paso es decir yo no quiero  mandar aca este token y no quiero mandar los headers porque lo va
    //hacer el interceptor , adicionalmente voy manejar todos los errores mediante el mismo receptor ; por el momento
    //quiero que cualquier peticion que haga de este servicio deberia pasar o obtener lo que es el token de usuario ,
    //todos deberian de tener.
    /*Por lo cual debemos crear un interceptor que sea capaz de atrapar esta peticion o cualquier peticion que salga de
    este servicio y a su vez me coloque el token
    --El interceptopr no es mas que un servicio comun y corriente como cualquier otro tipo de servicio que se encarga 
    de interceptar las peticiones http
     */

    //Definir los header , por ejm un header personalizado podria ser el token o x-token que es la manera tradicional
    // const headers = new HttpHeaders({

    //   'token-usuario': 'ABCSDSDW122342'
    // });
    //Today esos headers mandar a la peticion , puede ser un token o cualquier cantidad de header que piden el backend 

    return this.http.get(`https://reqres43243244234.in/api/user`, {
      params
      // headers: headers
    }).pipe(
      // map(resp=>{
      //   //La idea es no utilizaar este tipo de llamado de un bjeto
      //   return resp['data'];
      // })
      map(resp => resp['data']),
      // catchError(this.manejarError)//Ahora se puede agregar el catchError para c/u de las peticiones
    );
  }
  //Vemos la necesidad de implementar algoo que nos ayude a interceptar todas los que son las peticiones fallidas 
  //de la aplicacion y procesarlas de esta manera (al tener muchas peticiones)

  //Para manejar nuestro propio error , cuando se cayo el servicio , no hay comunicacion

  // manejarError(error: HttpErrorResponse) {
  //   console.log('Sucesdio el error');

  //   //Nos muestra lo que recibe el error del throwError, el err es de tipo httperrorresponse
  //   console.warn(error);//aparece en amarillo 
  //   return throwError('Error supervisado');
  // }

}
