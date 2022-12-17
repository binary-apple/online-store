import Request from '../Request';

const request = new Request();

test('Получение данных', async () => {
    const apiProps = {
        context: null,
        url: 'https://jsonplaceholder.typicode.com/comments?postId=1',
        e: undefined,
    };
    const comments = await request.get(apiProps);

    expect(Array.isArray(comments)).toBe(true);
});
