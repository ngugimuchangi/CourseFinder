// Parser class
class Parser {
  /**
   * Parses meta tags for course data based on open graph protocol
   * @param {Array} coursePage - list of meta tag objects
   * @returns {object} - parsed course data
   */
  static async metaParser(coursePage) {
    const courseData = {
      title: null,
      provider: null,
      description: null,
      url: null,
      imageUrl: null,
    };
    try {
      courseData.title = await coursePage.$eval("meta[property='og:title']", (meta) => meta.content);
      courseData.description = await coursePage.$eval("meta[property='og:description']", (meta) => meta.content);
      courseData.url = await coursePage.$eval("meta[property='og:url']", (meta) => meta.content);
      courseData.imageUrl = await coursePage.$eval("meta[property='og:image']", (meta) => meta.content);
    } catch (error) {
      throw new Error(`Parsing meta tags failed => : ${error}`);
    }
    return courseData;
  }
}
export default Parser;
