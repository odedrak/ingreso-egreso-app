import * as fromAuth from './auth.actions';
import { User } from './user.model';

export interface AuthState {
    user: User;
}


const estadoInicial: AuthState = {
    user: null
};


export function authReducer(state = estadoInicial, action: fromAuth.acciones) {

    switch (action.type) {
        case fromAuth.SET_USER:
            return {
                // ... devuelve todos los pares de valores de action.user. crea un objeto nuevo
                user: { ... action.user}
            };

        default:
            return state;

    }

}
