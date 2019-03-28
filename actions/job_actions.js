import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import { FETCH_JOBS } from './types';

export const fetchJobs = (region) => {
    return async function(dispatch) {
        try {
            let zip = await reverseGeocode(region);

        } catch (error) {
            console.log(error);
        }
    };
};
