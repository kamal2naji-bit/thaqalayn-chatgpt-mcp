export declare type Book = {
  BookId?: String;
  BookName?: String;
  author?: String;
  idRangeMin?: Number;
  idRangeMax?: Number;
  bookDescription?: String;
  bookCover?: String;
  englishName?: String;
  translator?: String;
  Volume: Number;
};

export declare type ControllerResponse = {
  success: boolean;
  data?: string;
  error?: string;
};

export declare type MCPReturn = {
  content?: [type?: string, text?: string];
};

declare type Author = {
  name_en?: String;
  name_ar?: String;
  link?: String;
  death_date?: String;
}

declare type Grading = {
  grade_en: String;
  grade_ar: String;
  reference_en: String;
  author: Author;
}

export declare type Hadith = {
  id: Number;
  bookId: String;
  book: String;
  category: String;
  categoryId: String;
  chapter: String;
  author: String;
  translator: String;
  englishText: String;
  arabicText: String;
  majlisiGrading: String;
  BehdudiGrading: String;
  MohseniGrading: String;
  URL: String;
  volume: String;
  frenchText: String;
  chapterInCategoryId: String;
  thaqalaynSanad: String;
  thaqalaynMatn: String;
  GradingsFull?: Grading[];
};

export declare type Ingredient = {
  ingredient: String;
  statuses: [String];
  info: [String];
  otherNames: [String];
  unknown: [String];
};

export declare type IntrospectionResponse = {
  data: {
    __schema: {
      types: Array<{
        name: string;
        kind: string;
        fields: Array<{
          name: string;
        }> | null;
      }>;
    };
  };
};
