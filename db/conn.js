import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://Leelamani:Leelamanisahu@cluster0.sffiq1l.mongodb.net/Blog?retryWrites=true&w=majority&ssl=true",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connection is succesful");
  })
  .catch((err) => {
    console.log(`No connection${err}`);
  });
