import { connect } from "mongoose";

const URL: string =
  "mongodb+srv://dennisozoemena08:denny11..##@cluster0.shpr0lg.mongodb.net/studyDB?retryWrites=true&w=majority";

export const dbConfig = async () => {
  try {
    return await connect(URL).then(() => {
      console.log("DB connected");
    });
  } catch (error) {
    console.log(error);
  }
};
