import axios from 'axios';
import {
    GET_COMPLAINTS_SUCCESS,
    GET_COMPLAINTS_FAIL,
    COMPLAINT_POST_SUCCESS,
    COMPLAINT_POST_FAIL,
    COMPLAINT_DELETE_SUCCESS,
    COMPLAINT_DELETE_FAIL,
}from './types';


export const loadData = () => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    console.log("yeyyy")
    try {
        const res = await axios.get('/api/complaints/', config);
        dispatch({
            type: GET_COMPLAINTS_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_COMPLAINTS_FAIL,
        });
    }
}


export const postComplaint = (user, title, description, image, lattitude, longitude) => async dispatch =>{
    
    const config = {
        headers: {
            'x-auth-token': localStorage.getItem('token'),
            'Accept': 'application/json'
        }
    };

    var apikey = '4a619a36656941199bc6b32ec0c058a2';

    var api_url = 'https://api.opencagedata.com/geocode/v1/json'

    var request_url = api_url
        + '?'
        + 'key=' + apikey
        + '&q=' + encodeURIComponent(lattitude + ',' + longitude)
        + '&pretty=1'
        + '&no_annotations=1';

    var d = await axios.get(request_url)
    var address = d.data.results[0].formatted


    var fd = new FormData()

    fd.append("author" , user._id)
    fd.append("title" , title)
    fd.append("description" , description)
    fd.append("image" , image)
    fd.append("address" , address)
    fd.append("lattitude" , lattitude)
    fd.append("longitude" , longitude)
    const body = fd
    console.log(body);
    try {
        const res = await axios.post('/api/complaints/',body, config);
        console.log("compliant post success");
        dispatch({
            type: COMPLAINT_POST_SUCCESS,
        });

    } catch (err) {
        console.log("compliant post failed");
        dispatch({
            type: COMPLAINT_POST_FAIL,
        });
    }

}


export const deleteComplaint = () => async dispatch =>{
    const config = {
        headers: {
            'x-auth-token': localStorage.getItem('token'),
            'Accept': 'application/json'
        }
    };

    try {
        const pk = (window.location.pathname.split('/'))[2];
        const url = '/api/complaints/'+pk+'/';
        const res = await axios.delete(url, config);
        console.log(res)
        dispatch({
            type: COMPLAINT_DELETE_SUCCESS,
        });
        
    }catch (err) {
        dispatch({
            type: COMPLAINT_DELETE_SUCCESS,
        });
        console.log(err);
    }
}