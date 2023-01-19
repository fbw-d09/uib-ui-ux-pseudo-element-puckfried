const puppeteer = require("puppeteer");
const path = require('path');
const fs = require('fs');

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
    try {
        this.puppeteer.close();
    } catch (e) { }
    done();
});

describe('Part 1 - Quotes', () => {
    it("List elemets have `:before` pseudo element", async () => {
        const stylesheet = fs
            .readFileSync("./style.css")
            .toString("utf-8")
            .replace(/ /g, "");
        const before = /:[:]?before/g;
        expect(before.test(stylesheet)).toBe(true);
    });
    it("List elemets have `:after` pseudo element", async () => {
        const stylesheet = fs
            .readFileSync("./style.css")
            .toString("utf-8")
            .replace(/ /g, "");
        const after = /:[:]?after/g;
        expect(after.test(stylesheet)).toBe(true);
    });
    it("Pseudo elements use 'quotes' image", async () => {
        const stylesheet = fs
            .readFileSync("./style.css")
            .toString("utf-8")
            .replace(/ /g, "");
        const quoteImage = /quotes.png/g;
        expect(quoteImage.test(stylesheet)).toBe(true);
    });
});

describe('Part 2 - Files', () => {
    it("Files list should include link to a PDF file", async () => {
        const hrefs = await page.$$eval('*', el => Array.from(el).map(e => e.href));
        const pdf = /\.pdf/i;
        expect(pdf.test(hrefs)).toBeTruthy();
    });
    it("Files list should include link to an XLS file", async () => {
        const hrefs = await page.$$eval('*', el => Array.from(el).map(e => e.href));
        const xls = /\.xls/i;
        expect(xls.test(hrefs)).toBeTruthy();
    });
    it("Files list should include link to a DOC file", async () => {
        const hrefs = await page.$$eval('*', el => Array.from(el).map(e => e.href));
        const doc = /\.doc/i;
        expect(doc.test(hrefs)).toBeTruthy();
    });

    it("Link elemets have `:after` pseudo element", async () => {
        const stylesheet = fs
            .readFileSync("./style.css")
            .toString("utf-8")
            .replace(/ /g, "");
        const after = /:[:]?after/g;
        expect(after.test(stylesheet)).toBe(true);
    });

    it("Pseudo elements use icon images", async () => {
        const stylesheet = fs
            .readFileSync("./style.css")
            .toString("utf-8")
            .replace(/ /g, "");
        const fileFormats = /ms-word\.png|pdf\.png|ms-excel\.png/g;
        expect(fileFormats.test(stylesheet)).toBe(true);
    });
});


describe('Part 3 - Gradient', () => {
    it("Sandwich section should be styled using linear gradients", async () => {
        const linearGradient = /linear-gradient/g;
        const stylesheet = fs
            .readFileSync("./style.css")
            .toString("utf-8")
            .replace(/ /g, "");
        expect(linearGradient.test(stylesheet)).toBe(true);
    });
});