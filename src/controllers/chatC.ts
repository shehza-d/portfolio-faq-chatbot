const textGeneration = async (
  rule: string,
  prompt: string,
  start_sequence: string
) => {
  console.log("OPENAI_API_KEY", process.env.OPENAI_API_KEY);
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
