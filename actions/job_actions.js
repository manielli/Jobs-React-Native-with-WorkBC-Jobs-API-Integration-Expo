import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import { FETCH_JOBS } from './types';

const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: 'javascript'
};

export const fetchJobs = (region) => {
    return async function(dispatch) {
        try {
            let zip = await reverseGeocode(region);
            console.log(zip);

        } catch (error) {
            console.error(error);
        }
    };
};