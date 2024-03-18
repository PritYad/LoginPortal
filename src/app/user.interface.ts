export interface UserInterface {
  email: string;
  username: string;
}

export interface ErrorInterface {
  code: string;
  message: string;
}

export interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

export interface ArticleList {
  articles: Article[];
}
