import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { UsuarioService } from "src/app/services/usuario.service";
import * as oUsuariosActions from "../actions";

@Injectable()
export class UsuariosEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}

  cargarUsuarios$ = createEffect(
    () => this.actions$.pipe(
      ofType(oUsuariosActions.cargarUsuarios), // ofType Especificar que accion me interesa escuchar
      // tap(data => console.log('effect tap ', data)), // tap SOLO MUESTRA INFORMACIÓN
      mergeMap(
        () => this.usuarioService.getUsers() // Callback observable del que quiero disparar
        .pipe(
          map( users => oUsuariosActions.cargarUsuariosSuccess({usuarios: users})),
          catchError( err => of(oUsuariosActions.cargarUsuariosError({payload: err})))
          // tap( data => console.log('getUsers effect', data))
        )
      ) // Dispara un nuevo observable y mezclarlo con el anterior
    )
  );
}