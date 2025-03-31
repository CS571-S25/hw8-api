import { Express } from 'express';

import { CS571Route } from "@cs571/api-framework/src/interfaces/route";
import BadgerArticle from '../model/badger-article';

export class CS571ArticleRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = (process.env['CS571_BASE_PATH'] ?? "") + '/article';

    private readonly articles: BadgerArticle[];
    private readonly presentableArticles: any;

    public constructor(articles: BadgerArticle[]) {
        this.articles = articles;
        this.presentableArticles = this.articles.reduce((acc: any, art: BadgerArticle) => {
            return {
                ...acc,
                [art.id]: art
            }
        }, {})
    }

    public addRoute(app: Express): void {
        app.get(CS571ArticleRoute.ROUTE_NAME, (req, res) => {
            const reqId = String(req.query.id);
            if (reqId && Object.keys(this.presentableArticles).includes(reqId)) {
                setTimeout(() => {
                    res.status(200).send(this.presentableArticles[reqId])
                }, 2000);
            } else {
                res.status(404).send({
                    msg: `Article not found.`
                })
            }
        })
    }

    public getRouteName(): string {
        return CS571ArticleRoute.ROUTE_NAME;
    }
}