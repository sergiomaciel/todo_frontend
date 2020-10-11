restClient(GET_LIST, 'posts', {
    pagination: { page: 1, perPage: 5 },
    sort: { field: 'title', order: 'ASC' },
    filter: { author_id: 12 },
});
restClient(GET_ONE, 'posts', { id: 123 });
restClient(CREATE, 'posts', { data: { title: "hello, world" } });
restClient(UPDATE, 'posts', {
    id: 123,
    data: { title: "hello, world!" },
    previousData: { title: "previous title" }
});
restClient(DELETE, 'posts', {
    id: 123,
    previousData: { title: "hello, world" }
});
restClient(GET_MANY, 'posts', { ids: [123, 124, 125] });
restClient(GET_MANY_REFERENCE, 'comments', {
    target: 'post_id',
    id: 123,
    sort: { field: 'created_at', order: 'DESC' }
});