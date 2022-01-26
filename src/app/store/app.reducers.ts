import { ActionReducerMap } from '@ngrx/store';
import * as oReducers from './reducers';

export interface AppState {
   usuarios: oReducers.UsuariosState,
   usuario: oReducers.UsuarioState,
}

export const appReducers: ActionReducerMap<AppState> = {
   usuarios: oReducers.usuariosReducer,
   usuario: oReducers.usuarioReducer,
}
