import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const fetchJson = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    
    options.headers.set('Content-Type', 'application/json');
    options.headers.set('Content-Range','Content-Range');
    // options.headers.set('Access-Control-Allow-Origin','http://localhost:3000');
    // options.headers.set('X-Custom-Header', 'foobar');
    console.log(options.headers);
    return fetchUtils.fetchJson(url, options);
}

export const dataProvider = simpleRestProvider('https://localhost:44338/api', fetchJson);