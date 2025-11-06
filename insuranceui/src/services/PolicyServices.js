import axios from 'axios';

export function getAllPolicies() {
    return axios.get('http://localhost:7000/policy');
}