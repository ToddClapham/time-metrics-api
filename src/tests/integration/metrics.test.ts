import request from "supertest";
import app from "../../app";

describe("GET /metrics", () => {
  it("should return metrics data when authorized", async () => {
    const response = await request(app)
      .get("/metrics")
      .set("Authorization", "Bearer mysecrettoken"); // Send correct header

    expect(response.status).toBe(200);
    console.log(response.body);
    expect(typeof response.body).toBe("object");
    // expect(typeof response.body.metrics).toBe('object');
  });

  it("should return 403 when no authorization header is provided", async () => {
    const response = await request(app).get("/metrics"); // No Authorization header

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty(
      "message",
      "Authorization header is missing"
    );
  });

  it("should return 403 when token is malformed", async () => {
    const response = await request(app)
      .get("/metrics")
      .set("Authorization", "Bear mysecrettoken"); // Send incorrect header

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "Authorization bearer token is malformed");
  });

  it("should return 403 when token is wrong", async () => {
    const response = await request(app)
      .get("/metrics")
      .set("Authorization", "Bearer invalid-token"); // Send incorrect header

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
});