import "dotenv/config";

export const config = {
  secret: process.env.APP_SECRET as string,
  expireIn: "10m",
};
