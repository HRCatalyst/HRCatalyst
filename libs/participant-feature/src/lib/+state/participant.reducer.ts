import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Participant } from '@hrcatalyst/shared-feature';
import * as ParticipantActions from './participant.actions';

export const participantsFeatureKey = 'participants';

export interface State extends EntityState<Participant> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Participant> = createEntityAdapter<Participant>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(ParticipantActions.addParticipant,
    (state, action) => adapter.addOne(action.participant, state)
  ),
  on(ParticipantActions.upsertParticipant,
    (state, action) => adapter.upsertOne(action.participant, state)
  ),
  on(ParticipantActions.addParticipants,
    (state, action) => adapter.addMany(action.participants, state)
  ),
  on(ParticipantActions.upsertParticipants,
    (state, action) => adapter.upsertMany(action.participants, state)
  ),
  on(ParticipantActions.updateParticipant,
    (state, action) => adapter.updateOne(action.participant, state)
  ),
  on(ParticipantActions.updateParticipants,
    (state, action) => adapter.updateMany(action.participants, state)
  ),
  on(ParticipantActions.deleteParticipant,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ParticipantActions.deleteParticipants,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ParticipantActions.loadParticipants,
    (state, action) => adapter.setAll(action.participants, state)
  ),
  on(ParticipantActions.clearParticipants,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
