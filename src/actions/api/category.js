import {requestPost} from '../../common/utils/request';

export function queryCategory(opt) {
    const route = '/Api/Product/queryCategory';
    return requestPost(route, opt)
}

export function addCategory(opt) {
    const route = '/Api/Product/addCategory';
    return requestPost(route, opt)
}

export function delCategory(opt) {
    const route = '/Api/Product/delCategory';
    return requestPost(route, opt)
}