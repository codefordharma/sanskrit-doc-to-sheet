const fs = require("fs");

/**
 * This function converts .txt file of sanskrit to .csv file
 *
 * @param {string} fileName - filename should be here which is kept in `/data` folder in .txt format
 */
async function txt_to_csv(fileName) {
  try {
    const data = await fs.readFileSync(`./data/${fileName}.txt`, "utf8");

    const arrayList = data
      .split("।। \r\n")
      .map((value) => value.split("।\r\n").join("। "))
      .map((value) =>
        value
          .split("\r\n")
          .filter((v) => v.length !== 0)
          .join("\r\n")
      )
      .join(",");

    try {
      await fs.writeFileSync(`./data/${fileName}-${Date.now()}.csv`, arrayList);
    } catch (error) {
      console.error("There is an Error writing the file.", error);
    }
  } catch (error) {
    console.error("There is an Error reading the file.", error);
  }
}

/**
 * call function here to with exact file name to generate .csv file
 *
 * NOTE: keep no space in between file name.
 */
txt_to_csv("valmiki-ramayana");
