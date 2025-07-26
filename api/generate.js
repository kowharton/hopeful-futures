export default async function handler(req, res) {
  const { fear } = await req.json();

  const prompt = `
You are a speculative fiction writer helping people feel hopeful about the future.

Someone has shared this fear about the climate crisis:
"${fear}"

Write a 100-word short story that transforms this fear into a beautiful, imaginative, and hopeful vision of the future. Be poetic, emotional, and end with a sense of possibility or peace.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
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

  const data = await response.json();

  return new Response(
    JSON.stringify({ story: data.choices?.[0]?.message?.content }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
