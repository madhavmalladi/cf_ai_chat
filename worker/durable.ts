import { DurableObjectState } from "./types";

export class ChatRoom {
  state: DurableObjectState;

  constructor(state: DurableObjectState) {
    this.state = state;
  }

  async fetch(request: Request) {
    const method = request.method;

    if (method === "POST") {
      // Store a new message
      const { message } = await request.json();
      const history =
        (await this.state.storage.get<string[]>("messages")) || [];

      history.push(message);
      await this.state.storage.put("messages", history);

      return new Response(JSON.stringify({ success: true }));
    } else if (method === "GET") {
      // Get conversation history
      const history =
        (await this.state.storage.get<string[]>("messages")) || [];
      return new Response(JSON.stringify(history));
    }

    return new Response("Method not allowed", { status: 405 });
  }
}
