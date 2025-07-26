export default async function handler(req, res) {
  const { fear } = await new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  });

  const prompt = `
You are a speculative fiction writer helping people feel hopeful about the future.

Someone has shared this fear about the climate crisis:
"${fear}"

Write a 100-word short story that transforms this fear into a beautiful, imaginative, and hopeful vision of the future. Be poetic, emotional, and end with a sense of possibility or peace.
`;

const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a hopeful speculative fiction writer helping people imagine beautiful futures.",
      },
      {
        role: "user",
        content: `Someone is afraid of: ${fear}\nWrite a 100-word poetic story that transforms this fear into a hopeful vision.`,
      },
    ],
    temperature: 0.9,
  }),
});

const data = await openaiRes.json();
console.log("OpenAI response:", JSON.stringify(data, null, 2));

const story = data?.choices?.[0]?.message?.content || "No story returned from OpenAI.";
res.status(200).json({ story });


  const data = await response.json();
  console.log("OpenAI response:", JSON.stringify(data, null, 2));

  const story = data?.choices?.[0]?.message?.content || "No story returned from OpenAI.";
  res.status(200).json({ story });

}
