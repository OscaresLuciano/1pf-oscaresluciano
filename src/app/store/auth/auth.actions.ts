import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Usuario } from "src/app/core/models";

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Set Auth User': props<{data: Usuario}>(),
        'Reset state': emptyProps(),
    }
});
