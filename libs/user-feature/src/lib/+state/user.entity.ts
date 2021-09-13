import { User } from "@hrc/shared-feature";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector } from "@ngrx/store";

export const usersFeatureKey = 'users';

export interface UserState  extends EntityState<User> {
  selectedUser?: User;
}

export function selectUserId(a: User): string {
  // In this case this would be optional since primary key is id
  return a.id ?? '';
}

export function sortByName(a: User, b: User): number {
  return (a.id ?? '').localeCompare(b.id ?? '');
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: selectUserId,
  sortComparer: sortByName,
});

export const initialState: UserState = adapter.getInitialState({
  // additional entity state properties
  selectedUser: undefined
});

// Create the default selectors
export const getUserState = createFeatureSelector<UserState>('company');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getUserState);


