const puppeteer = require("puppeteer");

async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();

  await page.goto("https://jozefrzadkosz-portfolio.pl");

  // * Screenshoots
  //   await page.pdf({ path: "portfolio.pdf", format: "A4" });
  //   await page.screenshot({ path: "example.png" });

  // * $$eval - working
  const result = await page.$$eval(".project", (projects) => {
    return projects.map((el) => {
      const title = el.textContent;
      const href = el.querySelector("a").getAttribute("href");
      const image = el.querySelector("img").getAttribute("src");

      el.style.border = "2px solid red";
      el.style.boxShadow = "0 10px 30px rgba(0,0,0,.3)";

      return { title, href, image };
    });
  });

  console.log(result);

  // * $eval - working
  // const result = await page.$eval(".project", (project) => {
  //   const title = project.textContent;
  //   const href = project.querySelector("a").getAttribute("href");
  //   const image = project.querySelector("img").getAttribute("src");

  //   project.style.border = "2px solid red";
  //   project.style.boxShadow = "0 10px 30px rgba(0,0,0,.3)";

  //   return { title, href, image };
  // });

  // const result = await page.$$(".project", (project) => {
  //   return project.textContent;
  // });

  // * $$ not working
  //   const projectsArray = await page.$$(".project");
  //   function getTemp(result) {
  //     console.log(result);
  //   }
  //   Promise.all(projectsArray).then((el) => {
  //     const result = [];
  //     el.map((elem) => {
  //       return elem
  //         .getProperty("textContent")
  //         .then((data) => result.push(data.jsonValue()));
  //     });
  //     getTemp(result);
  //   });
  // })();

  // * $ querySelector - if emtpy null
  // * $$ querySelectorAll - if empty []
  // * $eval (selector, (returns selector) => ...) - querySelector
  // * $$eval (selector, (returns selector result) => ...) - querySelectorAll
};
