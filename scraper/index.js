import jsdom from 'jsdom'
import fs from 'fs'

const URLS = [
    {
        url: "https://news.wisc.edu/aaas-members-elect-uw-researchers-new-fellows/",
        img: "aaas.jpg",
        tags: ["research"]
    },
    {
        url: "https://news.wisc.edu/could-an-arthritis-drug-unlock-lasting-relief-from-epilepsy-and-seizures-uw-madison-researchers-see-promising-results-in-mice/",
        img: "arthritis.jpg",
        tags: ["medical", "research"]
    },
    {
        url: "https://news.wisc.edu/nih-funding-drives-life-saving-innovation-and-economic-impact-in-wisconsin-university-biomedical-and-industry-leaders-issue-call-to-protect-it/",
        img: "nih.jpg",
        tags: ["medical", "research"]
    },
    {
        url: "https://news.wisc.edu/project-to-explore-enzyme-behind-early-evolution-of-life-on-earth/",
        img: "enzyme.jpg",
        tags: ["research"]
    },
    {
        url: "https://news.wisc.edu/human-stem-cell-derived-heart-cells-are-safe-in-monkeys-could-treat-congenital-heart-disease/",
        img: "monkeys.jpg",
        tags: ["medical", "research"]
    },
    {
        url: "https://news.wisc.edu/teaching-research-lead-uw-to-rise-in-worldwide-rankings/",
        img: "rankings.jpg",
        tags: ["research"]
    },
    {
        url: "https://news.wisc.edu/an-up-close-look-at-climate-coverage/",
        img: "climate.jpg",
        tags: ["environment"]
    },
    {
        url: "https://news.wisc.edu/dr-nita-ahuja-named-next-dean-of-university-of-wisconsin-school-of-medicine-and-public-health-vice-chancellor-for-medical-affairs/",
        img: "ahuja.jpeg",
        tags: ["medical"]
    },
    {
        url: "https://news.wisc.edu/aquatic-invasive-species-are-more-widespread-in-wisconsin-than-previously-thought/",
        img: "aquatic.jpg",
        tags: ["environment", "research"]
    },
    {
        url: "https://news.wisc.edu/great-lakes-climate-reporter-to-visit-campus-as-fall-science-journalist-in-residence/",
        img: "izzy.jpg",
        tags: ["environment"]
    },
    {
        url: "https://news.wisc.edu/faculty-and-staff-explore-states-rivers-culture-and-more-in-wisconsin-idea-seminar/",
        img: "explore.jpg",
        tags: ["environment"]
    }
]

const articles = [];

for(const url of URLS) {
    console.log("Processing " + url.url);
    const resp = await fetch(url.url, {
        headers: {
            "Connection": "keep-alive"
        }
    });
    const data = await resp.text();
    // https://stackoverflow.com/questions/11398419/trying-to-use-the-domparser-with-node-js
    const dom = new jsdom.JSDOM(data);
    const story = dom.window.document.getElementsByClassName("story-body")[0].textContent
        .replace(/(\r?\n)+/g, "\n")
        .replace(/Share via .*/g, "")
        .replace(/Photo by .*/g, "")
        .split("\n")
        .map(cleanStr)
        .filter(t => t)
    const title = dom.window.document.getElementsByClassName("story-head")[0].getElementsByTagName("h1")[0].textContent
    const author = dom.window.document.getElementsByClassName("writer")[0]?.textContent.replace(/By /g, "")
    const dt = dom.window.document.getElementsByClassName("date")[0]?.textContent
    await sleep(500 + Math.ceil(500 * Math.random()))
    articles.push({
        title: cleanStr(title),
        body: story,
        posted: dt ?? "unknown",
        url: url.url,
        author: author ?? "unknown",
        img: url.img,
        tags: url.tags
    })
}

fs.writeFileSync("_articles.json", JSON.stringify(articles, null, 2))

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function cleanStr(s) {
    return s.trim()
        .replace(/“/g, '"')
        .replace(/”/g, '"')
        .replace(/’/g, '\'')
        .replace(/–/g, "-")
        .replace(/ /g, " ")
}