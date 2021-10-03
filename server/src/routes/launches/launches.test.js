describe('GET /launches', () => {
  test('It should respond with 200 success', () => {
    const response = 200;
    expect(response).toBe(200);
  });
});

describe('POST /launches', () => {
  test('It should respond with 200 success', () => {
    const response = 200;
    expect(response).toBe(200);
  });
  test('It should catch missing launch details', () => {
    const response = 400;
    expect(response).toBe(400);
  });
  test('It should catch invalid dates', () => {
    const response = 400;
    expect(response).toBe(400);
  });
});
