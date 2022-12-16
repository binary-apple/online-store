import Request from '../Requst';

const request = new Request();

test('Получение данных', async () => {
    const comments = await request.get(null, 'https://jsonplaceholder.typicode.com/comments?postId=1');

    expect(Array.isArray(comments)).toBe(true);
});
