import fs from 'fs'

import express, { Express } from 'express';

import { CS571Initializer } from '@cs571/api-framework'
import BadgerArticle from './model/badger-article';
import { CS571ArticlesRoute } from './routes/articles';
import { CS571ArticleRoute } from './routes/article';
import cookies from 'cookie-parser'


console.log("Welcome to HW8!");

const app: Express = express();
app.use(cookies());

const appBundle = CS571Initializer.init(app, {
  allowNoAuth: [],
  skipAuth: false
});

const parsedArticles = JSON.parse(fs.readFileSync("includes/_articles.json").toString())
const articles = parsedArticles.map((article: any) => new BadgerArticle(
  article.img,
  article.title,
  article.body,
  article.author,
  article.posted,
  article.url,
  article.tags
));


appBundle.router.addRoutes([
  new CS571ArticlesRoute(articles),
  new CS571ArticleRoute(articles)
])

app.listen(appBundle.config.PORT, () => {
  console.log(`Running at :${appBundle.config.PORT}`);
});
