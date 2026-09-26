import {
  Book,
  Hadith,
  Ingredient,
  IntrospectionResponse,
} from "../../types/types.js";

export default class HadithService {
  apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  // Book-related operations
  async getAllBooks(): Promise<Book[]> {
    const response = await fetch(`${this.apiUrl}/allBooks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching books: ${response.statusText}`);
    }

    return await response.json();
  }

  // Hadith operations
  async getRandomHadith(bookId?: string): Promise<Hadith> {
    var url = `${this.apiUrl}/random`;
    if (bookId !== undefined) {
      url = `${this.apiUrl}/${bookId}/random`;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching random data: ${response.statusText}`);
    }

    return await response.json();
  }

  async searchHadith(query: string, bookId?: string): Promise<Hadith[]> {
    const encodedQuery = encodeURIComponent(query);
    var url = `${this.apiUrl}/query?q=${encodedQuery}`;
    if (bookId !== undefined) {
      url = `${this.apiUrl}/query/${encodeURIComponent(bookId)}?q=${encodedQuery}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching query data: ${response.statusText}`);
    }

    return await response.json();
  }

  async fetchIngredients(): Promise<Ingredient[]> {
    const response = await fetch(`${this.apiUrl}/ingredients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching query data: ${response.statusText}`);
    }

    return await response.json();
  }

  async graphQLIntrospection(): Promise<IntrospectionResponse> {
    const minimalQuery = `
        query MinimalIntrospection {
          __schema {
            types {
              name
              kind
              fields {
                name
              }
            }
          }
        }
      `;

    const response = await fetch(`https://www.thaqalayn-api.net/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: minimalQuery,
      }),
    });
    if (!response.ok) {
      throw new Error(
        `Error fetching introspection data: ${response.statusText}`,
      );
    }

    return await response.json();
  }

  async graphQLRequest(gqlQuery: string): Promise<any> {
    const response = await fetch(`https://www.thaqalayn-api.net/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: gqlQuery,
      }),
    });
    if (!response.ok) {
      throw new Error(`Error fetching graphql data: ${response.statusText}`);
    }
    return await response.json();
  }
}
