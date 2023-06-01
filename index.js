const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const configuration = new Configuration({
  organization: "org-8lTghmp1h5Xh1OdenWJ8EhNn",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 8000;

app.post("/", async (req, res) => {
  const { message, currentModel } = req.body;
  console.log(message, "message");
  console.log(currentModel, "currentModel");
  const response = await openai.createCompletion({
    model: `${currentModel}`,
    // "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });

  res.json({
    message: response.data.choices[0].text,
  });
});
app.get("/models", async (req, res) => {
  const response = await openai.listEngines();
  console.log(response.data.data);
  res.json({
    models: response.data.data,
  });
});

app.listen(port, () => {
  console.log("SERVER STARTED AT PORT " + port);
});
