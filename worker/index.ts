import { ChatRoom } from "./durable";
import { Env } from "./types";

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    if (url.pathname === "/chat") {
      const { message } = await req.json();
      const id = env.CHATROOM.idFromName("session1");
      const obj = env.CHATROOM.get(id);

      // Store user message
      await obj.fetch("http://memory", {
        method: "POST",
        body: JSON.stringify({ message: `User: ${message}` }),
      });

      // Get conversation history
      const historyRes = await obj.fetch("http://memory", {
        method: "GET",
      });
      const history = await historyRes.json();
      const historyText = history.join("\n");

      // Get AI response
      const aiRes = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
        prompt: `${historyText}\nAssistant:`,
      });

      const aiReply = aiRes.response;

      // Store AI response
      await obj.fetch("http://memory", {
        method: "POST",
        body: JSON.stringify({ message: `Assistant: ${aiReply}` }),
      });

      return Response.json({ reply: aiReply });
    }

    return new Response("OK");
  },
};

export { ChatRoom };
