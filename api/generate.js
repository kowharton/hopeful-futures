export default async function handler(req, res) {
  const { fear } = req.body;

  const prompt = `
You are a speculative fiction writer helping people feel hopeful about the future.

Someone has shared this fear about the climate crisis:
"${fear}"

Write a 200-word short story that transforms this fear into a beautiful, imaginative, and hopeful vision of the future. Be poetic, emotional, and end with a sense of possibility or peace.
`;

  const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
    }),
  });

  const data = await openaiResponse.json();
  const result = data.choices?.[0]?.message?.content;
  res.status(200).json({ story: result });
}
