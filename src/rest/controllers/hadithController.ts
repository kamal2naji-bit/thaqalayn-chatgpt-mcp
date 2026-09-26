import HadithService from "../services/hadithService.js";
import {
  Book,
  ControllerResponse,
  Ingredient,
  Hadith,
} from "../../types/types.js";

export default class HadithController {
  service: HadithService;

  constructor(hadithService: HadithService) {
    this.service = hadithService;
  }

  async allBooksHandler(): Promise<ControllerResponse> {
    try {
      const books = await this.service.getAllBooks();
      return {
        success: true,
        data: books.map((book) => JSON.stringify(book)).join("\n"),
      };
    } catch (error) {
      console.error("Failed to fetch books:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async randomHadithHandler(bookId?: string): Promise<ControllerResponse> {
    try {
      var hadith: Hadith;
      if (bookId !== undefined) {
        hadith = await this.service.getRandomHadith(bookId);
      } else {
        hadith = await this.service.getRandomHadith();
      }
      return {
        success: true,
        data: JSON.stringify(hadith),
      };
    } catch (error) {
      console.error("Failed to fetch hadith:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async hadithQueryHandler(
    query: string,
    bookId?: string,
  ): Promise<ControllerResponse> {
    try {
      var hadiths: Hadith[];
      if (bookId !== undefined) {
        hadiths = await this.service.searchHadith(query, bookId);
      } else {
        hadiths = await this.service.searchHadith(query);
      }
      return {
        success: true,
        data: hadiths.map((hadith) => JSON.stringify(hadith)).join("\n"),
      };
    } catch (error) {
      console.error("Failed to fetch hadiths:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async ingredientsHandler(): Promise<ControllerResponse> {
    try {
      const ingredients = await this.service.fetchIngredients();
      return {
        success: true,
        data: ingredients
          .map((ingredient) => JSON.stringify(ingredient))
          .join("\n"),
      };
    } catch (error) {
      console.error("Failed to fetch ingredients:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async introspectionHandler(): Promise<ControllerResponse> {
    try {
      const introSpection = await this.service.graphQLIntrospection();
      return {
        success: true,
        data: JSON.stringify(introSpection),
      };
    } catch (error) {
      console.error("Failed to fetch introspection:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async gqlHandler(gqlQuery: string): Promise<ControllerResponse> {
    try {
      const gql = await this.service.graphQLRequest(gqlQuery);
      return {
        success: true,
        data: JSON.stringify(gql),
      };
    } catch (error) {
      console.error("Failed to fetch gql response:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
