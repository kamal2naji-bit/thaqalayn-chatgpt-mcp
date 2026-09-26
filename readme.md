# Thaqalayn-api MCP Server

An MCP server implementation that integrates the thaqlayn API.

## Features

- **Get all books**: Get information about each book. Provides Book IDs required for endpoints that require it.
- **get random hadith**: Get a random hadith
- **Search all books**: Search through all the book with a query
- **Smart Fallbacks**: Local search automatically falls back to web when no results are found

## Tools

- **get-all-books**
  - Get information about each book. Provides Book IDs required for endpoints that require it.

- **get-random-hadith**
  - Get a random hadith

- **search-all-books**
  - Search hadiths based on a query
  - Inputs:
    - `query` (string) Search query

- **fetch-ingredients**
  - Fetches a list of ingredients and their halal / haram status

- **get-graphql-introspection**
  - Fetches the graphql introspection, used to know how to make requests to the graphql api
    to fetch only the necessary fields.

- **make-gql-request**
  - Makes a gql request to the thaqalayn API
  - Inputs:
    - `query` (string) graphql query


## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
