import crypto from 'crypto'

export default class BadgerArticle {
    readonly id: string;
    readonly img: string;
    readonly title: string;
    readonly body: string[];
    readonly author: string;
    readonly posted: string;
    readonly url: string;
    readonly tags: string[]


    public constructor(
        img: string,
        title: string,
        body: string[],
        author: string,
        posted: string,
        url: string,
        tags: string[]
    ) {
        this.id = crypto.createHash('sha256').update(title + author + posted).digest('hex').substring(0,20);
        this.img = img;
        this.title = title;
        this.body = [...body];
        this.author = author;
        this.posted = posted;
        this.url = url;
        this.tags = [...tags];
    }
}