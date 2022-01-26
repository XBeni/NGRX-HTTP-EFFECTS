import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { cargarUsuarios } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  aUsuarios: Usuario[] = [];
  bLoading: boolean = false;
  error: any;

  constructor( 
    //public usuarioService: UsuarioService
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {
    this.store.select('usuarios').subscribe( ({users, loading, error}) => {
      this.aUsuarios = users;
      this.bLoading = loading;
      this.error = error;
    })
    this.store.dispatch(cargarUsuarios())
    /*
    this.usuarioService.getUsers().subscribe( users => {
      this.aUsuarios = users;
    })
    */
  }

}
