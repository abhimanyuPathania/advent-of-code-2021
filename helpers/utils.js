const { readFile } = require("fs/promises");

async function readInputByLine(inputFilePath, parseInput) {
  try {
    const data = await readFile(inputFilePath, "utf8");
    let dataArr = data.split("\n");

    if (parseInput && typeof parseInput === "function") {
      dataArr = dataArr.map((v) => parseInput(v));
    }
    return dataArr;
  } catch (err) {
    console.error("readInputByLine::", err);
  }
}

module.exports = {
  readInputByLine,
};
