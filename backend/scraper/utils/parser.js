/**
 * Parses meta tags for course data based on open graph protocol
 * @param {object} page - page to parse meta tag data
 * @returns {object} - parsed course data
 */
export async function metaParser(page) {
  const courseData = {
    title: null,
    provider: null,
    description: null,
    url: null,
    imageUrl: null,
  };
  try {
    courseData.title = await page.$eval("meta[property='og:title']", (meta) => meta.content);
    courseData.description = await page.$eval("meta[property='og:description']", (meta) => meta.content);
    courseData.url = await page.$eval("meta[property='og:url']", (meta) => meta.content);
    courseData.imageUrl = await page.$eval("meta[property='og:image']", (meta) => meta.content);
  } catch (error) {
    throw new Error(`Parsing meta tags failed => : ${error}`);
  }
  return courseData;
}

const parser = { metaParser };
export default parser;
