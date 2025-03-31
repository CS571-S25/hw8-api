import crypto from 'crypto'
import BadgerArticle from './badger-article';

export default class BadgerArticleSummary {
    readonly id: string;
    readonly fullArticleId: string;
    readonly img: string;
    readonly title: string;
    readonly tags: string[]

    public constructor(article: BadgerArticle) {
        this.id = crypto.createHash('sha256').update(article.title + "-sum").digest('hex').substring(0,12);
        this.img = article.img;
        this.title = article.title;
        this.tags = [...article.tags];
        this.fullArticleId = article.id;
    }
}