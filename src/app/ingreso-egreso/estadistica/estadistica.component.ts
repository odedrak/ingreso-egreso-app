import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';

// Al usar lazyload (forfeature) hay que usar el estado extendido que tiene el campo que necesitamos
// import { AppState } from 'src/app/app.reducer';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egresos: number;
  cuantosIngresos: number;
  cuantosEgresos: number;
  suscription: Subscription = new Subscription();

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];


  constructor(private store: Store<fromIngresoEgreso.AppState>) { }

  ngOnInit() {
    this.suscription = this.store.select('ingresoEgreso').subscribe(ingresoEgreso => {
      this.contarIngresoEgreso(ingresoEgreso.items);
    });
  }

  contarIngresoEgreso (items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;

    items.forEach(item => {
      if (item.tipo === 'ingreso') {
        this.cuantosIngresos++;
        this.ingresos += item.monto;
      } else {
        this.cuantosEgresos++;
        this.egresos += item.monto;
      }
    });

    this.doughnutChartData = [this.ingresos, this.egresos];

  }

}
