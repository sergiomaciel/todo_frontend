import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'https://localhost:44338/api';
const httpClient = fetchUtils.fetchJson;

export default {
    getList: (resource, params) => {
        // const { page, perPage } = params.pagination;
        // const { field, order } = params.sort;
        // const query = {
        //     sort: JSON.stringify([field, order]),
        //     range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        //     filter: JSON.stringify(params.filter),
        // };

        const filtros = params.filter;
        var urlFiltros = '';

        for ( var key in filtros ) {
            urlFiltros += key != null 
            ? `${key}=${filtros[key]}&`
            : '';
        }

        console.log(`FILTROS => ${urlFiltros}`);
        const url = `${apiUrl}/${resource}?${urlFiltros}`;
        console.log("URL => "+url);
        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: json.length,
        }));
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: (resource, params) => {
        console.log(params);
        
        var formData = new FormData();
        formData.append("id", parseInt(params['data']['id']));
        formData.append("descripcion", params['data']['descripcion']);
        formData.append("estado",  params['data']['estado']);
        
        // Verifica si se actualizo la imagen
        if (params['data']['foto']['rawFile'] == null) {
            
            var nombreFoto;
            nombreFoto = params['data']['foto'].split('/')
            formData.append("foto", nombreFoto[nombreFoto.length - 1]);
            console.log('IMAGEN ORIGINAL');

            return httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'PUT',
                body: formData,
            }).then(({ json }) => ({ data: json }))
        } else {
            
            formData.append("foto", params['data']['foto']['rawFile']);
            console.log('IMAGEN ACTUALIZADA');

            return httpClient(`${apiUrl}/${resource}/${params.id}/img`, {
                method: 'PUT',
                body: formData,
            }).then(({ json }) => ({ data: json }))
        }

        
    },

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) => {
        console.log(params);

        var formData = new FormData();
        formData.append("descripcion", params['data']['descripcion']);
        formData.append("estado",  params['data']['estado']);
        formData.append("foto", params['data']['foto']['rawFile']);


        return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: formData,
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        }))
    },

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
};