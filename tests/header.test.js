const puppeteer = require("puppeteer");
const sessionFactory = require("./factories/session.factory");

let browser, page;

beforeEach(async () => {
	browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
	page = await browser.newPage();
	await page.goto("http://localhost:3000");
});

afterEach(async () => {
	await browser.close();
});

test("we can launch the browser", async () => {
	const text = await page.$eval("a.brand-logo", (el) => el.innerHTML);
	expect(text).toEqual("Blogster");
});

test("clicking login", async () => {
	await page.click(".right a");
	const url = await page.url();
	expect(url).toMatch(/accounts\.google\.com/);
});

test.only("when signed in, shows logout button", async () => {
	const { session, sig } = sessionFactory({ _id: "673d013d33a32e68f698dacf" });
	// const id = "673d013d33a32e68f698dacf";

	await page.setCookie({ name: "session", value: session });
	await page.setCookie({ name: "session.sig", value: sig });
	await page.goto("http://localhost:3000");
	await page.waitFor('a[href="/auth/logout"]');
	const text = await page.$eval('a[href="/auth/logout"]', (el) => el.innerHTML);
	expect(text).toEqual("Logout");
});
