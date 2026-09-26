import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import HadithController from "./rest/controllers/hadithController.js";
import HadithService from "./rest/services/hadithService.js";

export const registerHandlers = (server: McpServer) => {
  const API_BASE = "https://www.thaqalayn-api.net/api/v2";

  const hadithService = new HadithService(API_BASE);
  const hadithController = new HadithController(hadithService);

  server.registerTool(
    "get-all-books",
    { description: `Get all information about each book.
    Use this endpoint first to find book IDs if requesting an endpoint that requires a book id.
    endpoints require a bookId when requesting data from a specific book.` },
    async () => {
      const allBooks = await hadithController.allBooksHandler();
      if (!allBooks.data) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to retrieve book information",
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: allBooks.data,
          },
        ],
      };
    },
  );

  server.registerTool("get-random-hadith", { description: "Get a random hadith" }, async () => {
    const hadith = await hadithController.randomHadithHandler();
    if (!hadith.data) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve hadith",
          },
        ],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: hadith.data,
        },
      ],
    };
  });

  server.registerTool(
    "search-all-books",
    {
      description: `Search hadiths based on a query. For best results, come up with a list of related terms and search based on those terms,
      since this does not do fuzzy search`,
      inputSchema: { query: z.string().describe("search query") },
    },
    async ({ query }) => {
      const hadiths = await hadithController.hadithQueryHandler(query);
      if (!hadiths.data) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to retrieve hadiths",
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: hadiths.data,
          },
        ],
      };
    },
  );

  server.registerTool(
    "fetch-ingredients",
    { description: `
    Fetches all relevant ingredients with their haram / halal status and any extra information available.
    This is based on Sistani's rulings.
    ` },

    async () => {
      const ingredients = await hadithController.ingredientsHandler();
      if (!ingredients.data) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to retrieve ingredients",
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: ingredients.data,
          },
        ],
      };
    },
  );

  server.registerTool(
    "get-graphql-introspection",
    { description: `
    Fetches the graphql introspection, used to know how to make requests to the graphql api
    to fetch only the necessary fields.
    Before making any GQL request, a requst needs to be made to this tool to know how the GQL api works.
    ` },
    async () => {
      const introspection = await hadithController.introspectionHandler();
      if (!introspection.data) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to retrieve introspection",
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: introspection.data,
          },
        ],
      };
    },
  );

  server.registerTool(
    "make-gql-request",
    {
      description: `Makes a GQL request.
      Introspection data must first be fetched from the get-graphql-introspection tool to know which fields can be queried`,
      inputSchema: { query: z.string().describe(`
        graphql query. Query must be json object with "query" field and the gql query as a string value
      `) },
    },
    async ({ query }) => {
      const gql = await hadithController.gqlHandler(query);
      if (!gql.data) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to retrieve introspection",
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: gql.data,
          },
        ],
      };
    },
  );
};
