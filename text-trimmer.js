// text-trimmer.js

/**
 * Trims a string to a specified length and adds an ellipsis if truncated.
 * @param {string} text - The input text to trim.
 * @param {number} maxLength - The maximum length of the trimmed text (including ellipsis).
 * @param {string} [ellipsis='...'] - The ellipsis to append to truncated text.
 * @returns {string} The trimmed text.
 */
function trimText(text, maxLength, ellipsis = '...') {
    if (typeof text !== 'string') {
      throw new TypeError('Input must be a string');
    }
  
    if (typeof maxLength !== 'number' || maxLength <= 0) {
      throw new TypeError('Max length must be a positive number');
    }
  
    if (text.length <= maxLength) {
      return text;
    }
  
    const trimmedLength = maxLength - ellipsis.length;
    return text.slice(0, trimmedLength) + ellipsis;
  }
  
  module.exports = { trimText };
  
