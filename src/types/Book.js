
/**
 * @typedef {Object} ImageLinks
 * @property {string} [thumbnail]
 * @property {string} [small]
 * @property {string} [medium]
 * @property {string} [large]
 */

/**
 * @typedef {Object} Price
 * @property {number} amount
 * @property {string} currencyCode
 */

/**
 * @typedef {Object} SaleInfo
 * @property {string} saleability
 * @property {Price} [listPrice]
 * @property {Price} [retailPrice]
 */

/**
 * @typedef {Object} Book
 * @property {string} id
 * @property {string} title
 * @property {string[]} authors
 * @property {string} [description]
 * @property {string} [publishedDate]
 * @property {string} [publisher]
 * @property {number} [pageCount]
 * @property {string[]} [categories]
 * @property {ImageLinks} [imageLinks]
 * @property {string} [infoLink]
 * @property {string} [previewLink]
 * @property {Price} [price]
 * @property {SaleInfo} [saleInfo]
 * @property {number} [averageRating]
 * @property {number} [ratingsCount]
 */

export {};
