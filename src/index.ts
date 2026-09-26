import express, { type Request, type Response } from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { registerHandlers } from "./handlers.js";

function createServer() {
  const server = new McpServer({
    name: "thaqalayn-api",
    version: "1.0.0",
  });
  registerHandlers(server);
  return server;
}

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.json({ name: "Thaqalayn API MCP", status: "ok", endpoint: "/mcp" });
});

app.post("/mcp", async (req: Request, res: Response) => {
  const server = createServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  try {
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("MCP request failed:", error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal server error" },
        id: null,
      });
    }
  } finally {
    res.on("close", () => {
      void transport.close();
      void server.close();
    });
  }
});

const methodNotAllowed = (_req: Request, res: Response) => {
  res.status(405).json({
    jsonrpc: "2.0",
    error: { code: -32000, message: "Method not allowed" },
    id: null,
  });
};

app.get("/mcp", methodNotAllowed);
app.delete("/mcp", methodNotAllowed);

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
app.listen(port, "0.0.0.0", () => {
  console.log(`Thaqalayn API MCP listening on port ${port}`);
});
