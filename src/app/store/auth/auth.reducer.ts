import { createReducer, on } from "@ngrx/store";
import { Usuario } from "src/app/core/models";
import { AuthActions } from "./auth.actions";

export const  authFeatureKey =  'auth';

export interface State {
    authUser: Usuario | null;
}

const initialState: State = {
    authUser: null,
}

export const reducer = createReducer(
    initialState,    
    on(AuthActions.setAuthUser, (state, { data }) => ({
        ...state,
        authUser: data
    })),
    
    on(AuthActions.resetState, () => initialState)
)