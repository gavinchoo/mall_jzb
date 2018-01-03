import {requestPost} from '../utils/request';

export function getAllPersonal(opt) {
    const route = '/api/getallpersonal';
    return requestPost(route, opt)
}

export function delPersonal(opt) {
    const route = '/api/delperson';
    return requestPost(route, opt)
}

export function addPersonal(opt) {
    const route = '/api/addperson';
    return requestPost(route, opt)
}