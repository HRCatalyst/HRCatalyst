import { Relationship } from "../models/rater.model";

export enum enumRationship {
  UNKNOWN = 0,
  DIRECT_REPORT = 1,
  INDIRECT_REPORT = 2,
  COLLEAGUE = 3,
  PEER = 4,
  EC_MEMBER = 5,
  BOARD_MEMBER = 6,
  FSLT = 7,
  OTHER = 8
}

export const RELATIONSHIP_DATA: Relationship[] = [
{
  id: 0,
  name: 'Unknown'
},
{
  id: 1,
  name: 'Direct Report'
},
{
  id: 2,
  name: 'Indirect Report'
},
{
  id: 3,
  name: 'Colleague'
},
{
  id: 4,
  name: 'Peer'
},
{
  id: 5,
  name: 'EC Member'
},
{
  id: 6,
  name: 'Board Member'
},
{
  id: 7,
  name: 'FSLT'
},
{
  id: 8,
  name: 'Other'
}];
