import {requestPost} from '../../common/utils/request';

export function queryProduct(opt) {
    const route = '/Api/Product/queryProduct';
    return requestPost(route, opt)
}

export function addProduct(opt) {
    const route = '/Api/Product/addProduct';
    return requestPost(route, opt)
}

export function delProduct(opt) {
    const route = '/Api/Product/delProduct';
    return requestPost(route, opt)
}