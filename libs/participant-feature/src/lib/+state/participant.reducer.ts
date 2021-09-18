import { createReducer, on } from '@ngrx/store';
import * as ParticipantActions from './participant.actions';
import { participantEntity } from '@hrc/shared-feature';


export const reducer = createReducer(
  participantEntity.initialState,
  on(ParticipantActions.addParticipant,
    (state, action) => participantEntity.adapter.addOne(action.participant, state)
  ),
  on(ParticipantActions.upsertParticipant,
    (state, action) => participantEntity.adapter.upsertOne(action.participant, state)
  ),
  on(ParticipantActions.addParticipants,
    (state, action) => participantEntity.adapter.addMany(action.participants, state)
  ),
  on(ParticipantActions.upsertParticipants,
    (state, action) => participantEntity.adapter.upsertMany(action.participants, state)
  ),
  on(ParticipantActions.updateParticipantEntity,
    (state, action) => participantEntity.adapter.updateOne(action.participant, state)
  ),
  on(ParticipantActions.updateParticipants,
    (state, action) => participantEntity.adapter.updateMany(action.participants, state)
  ),
  on(ParticipantActions.deleteParticipantEntity,
    (state, action) => participantEntity.adapter.removeOne(action.id, state)
  ),
  on(ParticipantActions.deleteParticipants,
    (state, action) => participantEntity.adapter.removeMany(action.ids, state)
  ),
  on(ParticipantActions.loadParticipants,
    (state, action) => participantEntity.adapter.setAll(action.participants, state)
  ),
  on(ParticipantActions.clearParticipants,
    state => participantEntity.adapter.removeAll(state)
  ),
  on(ParticipantActions.loadParticipant,
    state => { return state; }
  ),
  on(ParticipantActions.loadParticipantCampaign,
    state => { return state; }
  ),
  on(ParticipantActions.loadParticipantCampaignInprogress,
    state => { return state; }
  ),
  on(ParticipantActions.loadParticipantCampaignSuccess,
    state => { return state; }
  ),
  on(ParticipantActions.loadParticipantCampaignFailure,
    state => { return state; }
  ),
  on(ParticipantActions.loadCampaignParticipants,
    state => { return state; }
  ),
  on(ParticipantActions.loadCampaignParticipantsInprogress,
    state => { return state; }
  ),
  on(ParticipantActions.loadCampaignParticipantsSuccess,
    state => { return state; }
    ),
  on(ParticipantActions.loadCampaignParticipantsFailure,
    state => { return state; }
  ),
  on(ParticipantActions.loadCampaignAssociatesSuccess,
    state => { return state; }
  ),
  on(ParticipantActions.selectParticipant,
    state => { return state; }
  ),
  on(ParticipantActions.createParticipant,
    state => { return state; }
  ),
  on(ParticipantActions.createParticipantSuccess,
    state => { return state; }
  ),
  on(ParticipantActions.createParticipantFailire,
    state => { return state; }
  ),
  on(ParticipantActions.updateParticipant,
    state => { return state; }
  ),
  on(ParticipantActions.updateParticipantSuccess,
    state => { return state; }
  ),
  on(ParticipantActions.updateParticipantFailure,
    state => { return state; }
  ),
  on(ParticipantActions.deleteParticipant,
    state => { return state; }
  ),
  on(ParticipantActions.deleteParticipantSuccess,
    state => { return state; }
  ),
  on(ParticipantActions.deleteParticipantFailure,
    state => { return state; }
  ),
);

