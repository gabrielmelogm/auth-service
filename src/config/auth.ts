import "dotenv/config";

export const config = {
  secret: process.env.APP_SECRET,
  expireIn: "10m",
};
