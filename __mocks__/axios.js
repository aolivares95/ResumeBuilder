const axios = {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(data => {})
};
module.exports = axios;
