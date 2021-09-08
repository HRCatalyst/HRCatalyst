import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

export const authFeatureKey = 'auth';

export interface AuthState  extends EntityState<Auth> {
  selectedAuth?: Auth;
}

export function selectassociateId(a: Auth): string {
  // In this case this would be optional since primary key is id
  return a.id ?? '';
}

export const adapter: EntityAdapter<Auth> = createEntityAdapter<Auth>({
  selectId: selectassociateId,
  sortComparer: sortByName,
});

export function sortByName(a: Auth, b: Auth): number {
return (a.lastName + a.firstName).localeCompare(b.lastName + a.firstName);
}

// Create the default selectors
export const getAuthState = createFeatureSelector<AuthState>('associate');

export const {
selectIds,
selectEntities,
selectAll,
selectTotal,
} = adapter.getSelectors(getAuthState);

export const initialState: AuthState = adapter.getInitialState({
// additional entity state properties
selectedAuth: undefined,
});
