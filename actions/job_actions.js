import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import { FETCH_JOBS } from './types';
import { constant } from '../constants';
import JOB_DATA from './IndeedJobData.json';
import { Location, Permissions } from 'expo';

// const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_ROOT_URL = 'https://workbcjobs.api.gov.bc.ca/v1/jobs'

// const JOB_QUERY_PARAMS = {
//     publisher: '4201738803816157',
//     format: 'json',
//     v: '2',
//     latlong: 1,
//     radius: 10,
//     q: 'javascript'
// };

const JOB_QUERY_PARAMS = {
    lastRequestDate: '2018-07-01',
    region: '2',
    jobTypes: [ 1 ],
    majorProjects: false
};

// const buildJobsUrl = (zip) => {
//     const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
//     return `${JOB_ROOT_URL}${query}`;
// };

export const fetchJobs = (region) => {
    return async function(dispatch) {
        try {
            // let zip = await reverseGeocode(region);
            // const url = buildJobsUrl(zip);
            // let { data } = await axios.get(url);
            // dispatch({ type: FETCH_JOBS, payload: data });
            // console.log(data);

            const { latitude, longitude } = region;
            Location.setApiKey(`${constant.apiKey}`);
            let address = await Location.reverseGeocodeAsync({ latitude, longitude });
            console.log(address);
            let { data } = await axios.post(JOB_ROOT_URL, { ...JOB_QUERY_PARAMS, city: address.city });
            dispatch({ type: FETCH_JOBS, payload: data });
            console.log(data);

            // let data = JOB_DATA;
            // dispatch({ type: FETCH_JOBS, payload: data });
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
};
