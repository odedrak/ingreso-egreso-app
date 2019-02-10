import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(public authService: AuthService) {}

  canActivate() {
    return this.authService.isAuth();
  }

  canLoad() {
    return this.authService.isAuth().pipe(
      // take indica cuantas notificaciones emitira el observable antes de cancelarse
      take(1)
    );
  }
}
