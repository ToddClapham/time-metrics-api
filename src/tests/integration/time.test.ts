import request from "supertest";
import app from "../../app";

describe("GET /time", () => {
  it("should return timeInSeconds when authorized", async () => {
    const response = await request(app)
      .get("/time")
      .set("Authorization", "Bearer mysecrettoken"); // Send correct header

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("timeInSeconds");
    expect(typeof response.body.timeInSeconds).toBe("number");
  });

  it("should return 403 when no authorization header is provided", async () => {
    const response = await request(app).get("/time"); // No Authorization header

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty(
      "message",
      "Authorization header is missing"
    );
  });

  it("should return 403 when token is malformed", async () => {
    const response = await request(app)
      .get("/time")
      .set("Authorization", "Bear mysecrettoken"); // Send incorrect header

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "Authorization bearer token is malformed");
  });

  it("should return 403 when token is wrong", async () => {
    const response = await request(app)
      .get("/time")
      .set("Authorization", "Bearer invalid-token"); // Send incorrect header

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
});
