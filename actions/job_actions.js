import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import { FETCH_JOBS } from './types';
import { constant } from '../constants';
import JOB_DATA from './IndeedJobData.json';
import { Location, Permissions } from 'expo';
import moment from 'moment';

// const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_ROOT_URL = 'https://workbcjobs.api.gov.bc.ca/v1/jobs';
const PLACE_REQUEST_ROOT_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';

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

// const buildJobsUrl = (zip) => {
//     const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
//     return `${JOB_ROOT_URL}${query}`;
// };

const buildPlaceRequestUrl = (name, region) => {
    const query = qs.stringify({ 
        key: constant.apiKey,
        radius: 5000, 
        location: `${region.latitude},${region.longitude}`, 
        keyword: `${name}`
    });
    return `${PLACE_REQUEST_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => {
    return async function(dispatch) {
        try {
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
            let { data } = await axios.post(JOB_ROOT_URL, { ...JOB_QUERY_PARAMS, city: cityOfAddress, lastRequestDate: lastRequestDate });
            const filteredData = getFilteredData(data);
            const { filteredJobs } = filteredData;
            // console.log(filteredData);
            let filteredJobsWithLocations = await filteredJobs.map( async (element) => {
                try {
                    const url = buildPlaceRequestUrl(element.employerName, region);
                    let { data } = await axios.get(url);
                    if (data.results.length === 0) {
                        element['location'] = { 
                            lng: -123.13505564733309, 
                            lat: 49.28883325048375
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

            let result = await Promise.all(filteredJobsWithLocations);
            console.log(result);
            // const filteredJobsWithLocationsCount = filteredJobsWithLocations.length;
            // const filteredDataWithLocations = { filteredJobsWithLocations };


            // const filteredDataWithLocations = getFilteredDataWithLocations(filteredData);
            dispatch({ type: FETCH_JOBS, payload: filteredData });
            callback();
            
            // let data = JOB_DATA;
            // dispatch({ type: FETCH_JOBS, payload: data });
            // callback();
            // console.log(data);
        } catch (error) {
            console.log(error);
            // console.error(error);
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

// const getFilteredDataWithLocations = (filteredData) => {
// };
