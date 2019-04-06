import { FETCH_JOBS } from '../actions/types';

const INITIAL_STATE = {  
    filteredJobsWithGeoLocation: [], 
    filteredJobsWithGeoLocationLength: 0 
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_JOBS:
            return action.payload;
        default: 
            return state;
    }
}
