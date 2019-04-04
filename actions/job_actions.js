import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import { 
    FETCH_JOBS, 
    LIKE_JOB,
    CLEAR_LIKED_JOBs
} from './types';
import { constant } from '../constants';
import JOB_DATA from './IndeedJobData.json';
import { Location, Permissions } from 'expo';
import moment from 'moment';

// The no-longer-available indeed.com jobs api root URL
// const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_ROOT_URL = 'https://workbcjobs.api.gov.bc.ca/v1/jobs';
const PLACE_REQUEST_ROOT_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';

// The no-longer-available indeed.com job query params
// const JOB_QUERY_PARAMS = {
//     publisher: '4201738803816157',
//     format: 'json',
//     v: '2',
//     latlong: 1,
//     radius: 10,
//     q: 'javascript'
// };

const JOB_QUERY_PARAMS = {
    region: '2',
    jobTypes: [ 
        { id: 1 }, 
    	{ id: 2 }, 
    	{ id: 3 }, 
    	{ id: 6 },
    	{ id: 9 },
    	{ id: 10 },
    	{ id: 11 },
    	{ id: 12 },
    	{ id: 13 },
        { id: 14 } 
    ],
    majorProjects: true
};

export const fetchJobs = (region, callback) => {
    return async function(dispatch) {
        try {
            // The indeed.com job api action creator section
            // let zip = await reverseGeocode(region);
            // const url = buildJobsUrl(zip);
            // let { data } = await axios.get(url);
            // dispatch({ type: FETCH_JOBS, payload: data });
            // callback();
            // console.log(data);

            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                Location.setApiKey(`${constant.apiKey}`);
            }
            const lastRequestDate = getLastRequestDate();
            const { latitude, longitude } = region;
            let address = await Location.reverseGeocodeAsync({ latitude, longitude });
            const cityOfAddress = address[0].city;
            let { data } = await axios.post(JOB_ROOT_URL, { 
                ...JOB_QUERY_PARAMS, 
                city: cityOfAddress, 
                lastRequestDate: lastRequestDate 
            });
            const filteredData = getFilteredData(data);
            // console.log(filteredData);
            const jobsData = await getFilteredDataWithGeoLocation(filteredData, region);
            dispatch({ type: FETCH_JOBS, payload: jobsData });
            callback();
            
            // A hardcoded jobs data into a JSON file to make
            // the no-longer-available indeed.com job api work
            // let data = JOB_DATA;
            // dispatch({ type: FETCH_JOBS, payload: data });
            // callback();
            // console.log(data);
        } catch (error) {
            console.log(error);
            // console.error(error);
            // The above is for indeed.com job api error handling
        }
    };
};

const getLastRequestDate = () => {
    const currentDate = new Date();
    const lastRequestDate = moment(currentDate)
                                .subtract(3, 'months')
                                .toISOString()
                                .split('T')[0];
    return lastRequestDate;
};

const getFilteredData = (data) => {
    const { jobs } = data;
    const filteredJobs = jobs.filter((element) => {
        return element.employerName !== null &&
            element.jobDescription !== null &&
            element.jobTitle !== null;
    });
    // const filteredJobs = filteredJobsTemp.slice(-10);
    const filteredJobsCount = filteredJobs.length;
    return { filteredJobsCount, filteredJobs };
};

// The indeed.com job api is no longer available so this url builder
// helper function is not valid anymore
// const buildJobsUrl = (zip) => {
//     const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
//     return `${JOB_ROOT_URL}${query}`;
// };

const buildPlaceRequestUrl = (emplyerName, region) => {
    const query = qs.stringify({ 
        key: constant.apiKey,
        radius: 5000, 
        location: `${region.latitude},${region.longitude}`, 
        keyword: `${emplyerName}`
    });
    return `${PLACE_REQUEST_ROOT_URL}${query}`;
};

const getFilteredDataWithGeoLocation = async (filteredData, region) => {
    const { filteredJobs } = filteredData;
    let filteredJobsWithLocation = await filteredJobs.map( async (element) => {
        try {
            const url = buildPlaceRequestUrl(element.employerName, region);
            let { data } = await axios.get(url);
            if (data.results.length === 0) {
                element['location'] = { 
                    lat: 49.28883325048375,
                    lng: -123.13505564733309 
                }
            } else {
                const { location } = data.results[0].geometry;
                element['location'] = location;  
            }
        } catch (error) {
            console.log(error);
        }
        return element;
    });

    let filteredJobsWithGeoLocation = await Promise.all(filteredJobsWithLocation);
    const filteredJobsWithGeoLocationLength = filteredJobsWithGeoLocation.length;
    const filteredDataWithGeoLocation = { filteredJobsWithGeoLocation, filteredJobsWithGeoLocationLength };
    return filteredDataWithGeoLocation;
};

export const likeJob = (job) => {
    return {
        payload: job,
        type: LIKE_JOB
    };
}

export const dislikeJob = (job) => {
    return {
        payload: job,
        type: DISLIKE_JOB
    };
}

export const clearLikedJobs = () => {
    return { type: CLEAR_LIKED_JOBs }
};
