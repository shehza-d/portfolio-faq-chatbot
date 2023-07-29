import express, { urlencoded, json } from "express";
import "dotenv/config";
import axios from "axios";
import path from "path";
import cors from "cors";



const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use((req, res, next) => {
  console.log(`Path ${req.path} with Method ${req.method}`);
  next();
});

app.get("/depression", async (req, res) => {
  const rule = `The following is a conversation with a expert depression counselor and Psychiatrists. counselor is helpful and very friendly and shows empathy, love and affection occasionally. the patient is ${req.body.gender} from ${req.body.country}. \n`;
  // console.log(rule);
  // console.log("🚀 ~ file: server.mjs:23 ~ app.post ~ req:", req.body);

  // if (
  //   !req.body.text ||
  //   !req.body.gender ||
  //   !req.body.country ||
  //   !req.body.start_sequence
  // ) {
  //   res.status(422).send({ message: "send all parameters" });
  //   return;
  // }

  try {
    const result = await textGeneration(
      rule,
      req.body.text,
      req.body.start_sequence
    );
    console.log("🚀 ~ file: chat.mjs:43 ~ app.post ~ result:", result)

    res.status(200).send(result);
  } catch (err) {
    console.log("err:this23 ", err);
    res.status(500).send({
      message: err?.response?.data?.error?.message || "Unknown error",
    });
  }
});

// app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});

const textGeneration = async (rule, prompt, start_sequence) => {
console.log("OPENAI_API_KEY",process.env.OPENAI_API_KEY);
  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      model: "text-davinci-003",
      prompt: `${rule} \n\n ${prompt} \n ${start_sequence}`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: ["You:"],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      }, 
    }
  );

  console.log("response.data", response.data);
  return response.data;
};
