import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector } from "@ngrx/store";
import { Auth } from "../models/auth.model";
import { IFirebaseUser } from "../models/firebase.user";
import { User } from "../models/user.model";

export const authFeatureKey = 'auth';

export interface AuthState  extends EntityState<Auth> {
     user?: IFirebaseUser;
     settings?: User;
     loading?: boolean;
     error?: string;
     selectedOrganization?: string;
}

export function selectauthId(a: Auth): string {
  // In this case this would be optional since primary key is id
  return a?.user?.uid ?? '';
}

export const adapter: EntityAdapter<Auth> = createEntityAdapter<Auth>({
  selectId: selectauthId,
  sortComparer: sortByName,
});

export function sortByName(a: Auth, b: Auth): number {
  return (a?.user?.displayName ?? '').localeCompare(b?.user?.displayName ?? '');
}

// Create the default selectors
export const getAuthState = createFeatureSelector<AuthState>('auth');

export const {
selectIds,
selectEntities,
selectAll,
selectTotal,
} = adapter.getSelectors(getAuthState);

export const initialState: AuthState = adapter.getInitialState({
   user: undefined,
   settings: undefined,
   loading: false,
   error: '',
   selectedOrganization: ''
});
