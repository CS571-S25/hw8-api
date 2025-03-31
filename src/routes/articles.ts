import { Express } from 'express';

import { CS571Route } from "@cs571/api-framework/src/interfaces/route";
import BadgerArticle from '../model/badger-article';
import BadgerArticleSummary from '../model/badger-article-summary';

export class CS571ArticlesRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = (process.env['CS571_BASE_PATH'] ?? "") +  '/articles';

    private readonly articles: BadgerArticle[];
    private readonly articleSummaries: BadgerArticleSummary[];

    public constructor(articles: BadgerArticle[]) {
        this.articles = articles;
        this.articleSummaries = articles.map(art => new BadgerArticleSummary(art));
    }

    public addRoute(app: Express): void {
        app.get(CS571ArticlesRoute.ROUTE_NAME, (req, res) => {
            res.status(200).set('Cache-control', 'public, max-age=60').send(this.articleSummaries);
        })
    }

    public getRouteName(): string {
        return CS571ArticlesRoute.ROUTE_NAME;
    }
}