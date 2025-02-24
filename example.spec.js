import axios, { HttpStatusCode } from "axios";

// Axios interceptors to allow response errors
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      return Promise.resolve(error.response);
    }
    return Promise.reject(error);
  }
);

// Function to get user by ID
async function getUserById(id) {
  return axios.get(`https://reqres.in/api/users/${id}`);
}

// Test suite
describe("User management API", () => {
  it("Get user by ID - User found", async () => {
    const resp = await getUserById(1);
    expect(resp.status).toBe(HttpStatusCode.Ok);
    expect(resp.data.data.id).toBe(1);
  });
  it("Get user by ID - User NOT found", async () => {
    const resp = await getUserById("usernotfound");
    expect(resp.status).toBe(HttpStatusCode.NotFound);
    expect(resp.data.data).toBe(undefined);
  });
});
