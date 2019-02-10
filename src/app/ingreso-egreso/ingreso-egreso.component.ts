import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

// Al usar lazyload (forfeature) hay que usar el estado extendido que tiene el campo que necesitamos
// import { AppState } from 'src/app/app.reducer';
import * as fromIngresoEgreso from './ingreso-egreso.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  tipo = 'ingreso';

  loadingSubscription: Subscription =  new Subscription();
  cargando: boolean;

  constructor(public ingresoEgresoService: IngresoEgresoService, private store: Store<fromIngresoEgreso.AppState>) { }

  ngOnInit() {
    this.loadingSubscription = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading );

    this.forma = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(0))
    });
  }

  crearIngresoEgreso() {

    this.store.dispatch(new ActivarLoadingAction());

    // con ... mandamos forma.value como pares de valores, y además añadimos tipo como otro par mas
    const ingresoEgreso = new IngresoEgreso({...this.forma.value, tipo: this.tipo});
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
        .then( resp => {
          Swal.fire('Creado', ingresoEgreso.descripcion, 'success');
          this.forma.reset({ monto: 0 });
          this.store.dispatch(new DesactivarLoadingAction());
        })
        .catch( err => {
          Swal.fire('Error en la creación', err, 'error');
          this.store.dispatch(new DesactivarLoadingAction());
        });

  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

}
