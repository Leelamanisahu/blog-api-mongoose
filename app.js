import express, { json } from "express";
// import blogRouter from "./routes/blog-routes";

import "./db/conn";

const app = express();

import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";

app.use(json());

app.use("/api/user", router);

app.use("/api/blog", blogRouter);

app.listen(4000, () => {
  console.log("server is started in 4000");
});
