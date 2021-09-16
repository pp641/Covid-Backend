const express = require("express");
const mongoose = require("mongoose");
const app = express();
const UserRoutes = require("./routes/UserRoutes");
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://helperDB:KtDKVEpk9W1409L0@cluster0.xlupw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected To The Mongodb Server");
  })
  .catch(() => {
    console.log("Cannot Connect to The Mongodb Server");
  });

app.use("/api", UserRoutes);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Connected To The Server on port : ${port}`);
});
