import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscripcion: Subscription = new Subscription();

  constructor(private store: Store<AppState>, public ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.subscripcion = this.store.select('ingresoEgreso').subscribe(ingresoEgreso => {
      this.items = ingresoEgreso.items;
    });
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

  borrarItem(item: any) {
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
    .then( () => {
      Swal.fire('Eliminado', item.descripcion, 'success');
    })
    .catch( err => {
      Swal.fire('Error al eliminar', err, 'error');
    });
  }

}
