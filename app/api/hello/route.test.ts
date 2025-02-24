import { GET } from './route';
import { expect, test } from 'vitest';

test('GET /api/hello 를 테스트 합니다', async () => {
  const res = await GET();
  expect(res.status).toBe(200);

  const data = await res.json();
  expect(data.message).toBe('Hello, world!');
});
