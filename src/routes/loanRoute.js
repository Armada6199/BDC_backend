const router = require("express").Router();
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
router.post("/", handleGetLoanTemplate);
function handleGetLoanTemplate(req, res, next) {
  const html = fs.readFileSync(
    path.join(__dirname, "..", "/views", "index.handlebars"),
    "utf-8"
  );
  async function generatePDFfromHTML(htmlContent, outputPath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ path: outputPath, format: "A4" });
    await browser.close();
    return pdfBuffer;
  }
  try {
    generatePDFfromHTML(html, "loanAgreemnt.pdf")
      .then((pdfBuffer) => {
        const base64Data = pdfBuffer.toString("base64");
        console.log(base64Data);
        res.send(base64Data);
      })
      .catch((err) => console.error("Error generating PDF:", err));
  } catch (err) {
    // do something on error
  }
}

module.exports = router;
