import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log("from the port 3000");
  res.send("Hello from server!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
