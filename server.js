const express = require('express');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const path = require('path')


const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;


const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);


app.use(express.static('src'))



app.post('/', async (req, res) => {
  const message =  req.body.message;
  
 
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: message}],
  });
  
  res.send(JSON.stringify({
   response: completion.data.choices[0].message
 }))
});




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
