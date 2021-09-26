import http from './http'
const api="http://localhost:8080/";
import Qs from 'qs';
const c={
    post:function (url, p) {
        return http.post(api+url,Qs.stringify(p));
    },
    get:function (url, p) {
        return http.get(api+url,{params:p});
    }
}
export default c;