import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import { FETCH_JOBS } from './types';
import { constant } from '../constants';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';

const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: 'javascript'
};

const JOB_QUERY_PARAMS2 = {
    apiKey: constant.apiKey
};

const buildJobsUrl = (zip) => {
    const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
    return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region) => {
    return async function(dispatch) {
        try {
            let zip = await reverseGeocode(region);
            
        } catch (error) {
            console.error(error);
        }
    };
};
