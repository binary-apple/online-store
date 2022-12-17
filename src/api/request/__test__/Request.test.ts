import Request from '../Request';
import testApp from '../../../__test__/createApp';

const request = new Request();

test('Получение данных', async () => {
    const apiProps = {
        context: null,
        url: 'https://jsonplaceholder.typicode.com/comments?postId=1',
        e: undefined,
    };
    const comments = await request.get(testApp.context, apiProps);

    expect(Array.isArray(comments)).toBe(true);
});
