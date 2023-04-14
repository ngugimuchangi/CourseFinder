// Parser class
class Parser {
  /**
   * Parses meta tags for course data based on open graph protocol
   * @param {Array} metaInfo - list of meta tag objects
   * @returns {object} - parsed course data
   */
  static metaParser(metaInfo) {
    const courseData = {
      title: null,
      provider: null,
      description: null,
      url: null,
      imageUrl: null,
    };
    for (const metaTag of metaInfo) {
      switch (metaTag.property = 'og:description') {
        case 'og:title':
          courseData.title = metaTag.content;
          break;
        case 'og:description':
          courseData.description = metaTag.content;
          break;
        case 'og:url':
          courseData.description = metaTag.content;
          break;
        case 'og:image':
          courseData.imageUrl = metaTag.content;
          break;
        default:
          break;
      }
    }
    return courseData;
  }
}
export default Parser;
