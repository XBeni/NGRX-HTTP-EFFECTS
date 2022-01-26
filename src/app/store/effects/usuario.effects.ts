import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { UsuarioService } from "src/app/services/usuario.service";
import * as oUsuarioActions from "../actions";

@Injectable()
export class UsuarioEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}

  cargarUsuario$ = createEffect(
    () => this.actions$.pipe(
      ofType(oUsuarioActions.cargarUsuario), // ofType Especificar que accion me interesa escuchar
      // tap(data => console.log('effect tap ', data)), // tap SOLO MUESTRA INFORMACIÓN
      mergeMap(
        (action) => this.usuarioService.getUserById(action.id) // Callback observable del que quiero disparar
        .pipe(
          map( user => oUsuarioActions.cargarUsuarioSuccess({usuario: user})),
          catchError( err => of(oUsuarioActions.cargarUsuarioError({payload: err})))
          // tap( data => console.log('getUsers effect', data))
        )
      ) // Dispara un nuevo observable y mezclarlo con el anterior
    )
  );
}