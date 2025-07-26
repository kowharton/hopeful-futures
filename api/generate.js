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
You are a hopeful speculative fiction writer helping people imagine beautiful futures.

Someone has shared this fear about the climate crisis:
"${fear}"

Write a 100-word poetic story that transforms this fear into a hopeful, beautiful vision of the future.
`;

  const hfResponse = await fetch(
    "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
      }),
    }
  );

  const data = await hfResponse.json();
  console.log("Hugging Face response:", data);

  const story = data?.[0]?.generated_text || "No story returned from model.";
  res.status(200).json({ story });
}
