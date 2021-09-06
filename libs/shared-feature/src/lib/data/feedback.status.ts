import { FeedbackStatus, FeedbackType } from "../models/feedback.model";

export enum enumFeedbackStatus {
    UNKNOWN = 0,
    RECEIVED = 1,
    RECEIVED_LATE = 2,
    PROCESSING_INTERVIEW = 3,
    PROCESSING_WRITTEN = 4,
    PENDING = 5,
    DECLINED = 6,
    PROVIDED_TO_MANAGER = 7,
    UNSOLICITED = 8,
    SUBMITTED = 9
}

export const FEEDBACK_STATUS: FeedbackStatus[] = [
{
    id: 0,
    name: 'Unknown'
},
{
    id: 1,
    name: 'Received' // (Import Default)
},
{
    id: 2,
    name: 'Received – Late'
},
{
    id: 3,
    name: 'Processing – Interview'
},
{
    id: 4,
    name: 'Processing – Written'
},
{
    id: 5,
    name: 'Pending'
},
{
    id: 6,
    name: 'Declined'
},
{
    id: 7,
    name: 'Provided to Manager'
},
{
    id: 8,
    name: 'Unsolicited'
},
{
    id: 9,
    name: 'Submitted'
}
];

export enum enumFeedbackType {
    UNKNOWN = 0,
    INTERVIEW = 1,
    WRITTEN = 2,
    UNSOLICITED = 3,
}

export const FEEDBACK_TYPE: FeedbackType[] = [
{
    id: 0,
    name: 'Unknown'
},
{
    id: 1,
    name: 'Interview'
},
{
    id: 2,
    name: 'Written'
},
{
    id: 3,
    name: 'Unsolicited'
}];

// export const EC_ASSOCIATES: string[] = [
//     'qHQ3z20vwXCwCgC2fMFH',
//     'JqDuxcTRhDbuk82qjdKJ',
//     'zoY8AJyEaJkERoMFnfPM',
//     '0UEMFrkbafKsrqrJhBxT',
//     'fItODvKXTsfKrLR4RFht',
//     'U5J8vzuwyQ8nmnnIsdAc',
//     '5XhZxJnQm3DcRDlFKGy3',
//     '0khdFQk6prALig2FHcz9',
//     '9pF8eaG7OmweE0tfrS1f',
//     'hoV1sLRmGGKgTtDUDWgL',
//     'NhyPvuqkHaqDlDbppiEV',
//     'GiT3dXTMXnyAm7oKYqgS',
//     'VgawhgEIoawpe3aGEurB',
//     'Pdr3QaujN0RTJWFNG89K',
//     'UjzcPxTw7iNJ4ZudaS00'
// ];
