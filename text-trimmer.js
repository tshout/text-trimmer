// text-trimmer.js

/**
 * Trims a string to a specified length or word count and adds an ellipsis if truncated.
 * @param {string} text - The input text to trim.
 * @param {Object} options - Configuration options.
 * @param {number} [options.maxLength] - The maximum length of the trimmed text (including ellipsis).
 * @param {number} [options.maxWords] - The maximum number of words in the trimmed text.
 * @param {string} [options.ellipsis='...'] - The ellipsis to append to truncated text.
 * @param {boolean} [options.respectWordBoundaries=true] - Whether to avoid splitting words.
 * @param {boolean} [options.stripHTML=false] - Whether to strip HTML tags before trimming.
 * @returns {string} The trimmed text.
 */
function trimText(text, options = {}) {
  if (typeof text !== 'string') {
    throw new TypeError('Input must be a string');
  }

  const {
    maxLength,
    maxWords,
    ellipsis = '...',
    respectWordBoundaries = true,
    stripHTML = false
  } = options;

  if (maxLength !== undefined && (typeof maxLength !== 'number' || maxLength <= 0)) {
    throw new TypeError('Max length must be a positive number');
  }

  if (maxWords !== undefined && (typeof maxWords !== 'number' || maxWords <= 0)) {
    throw new TypeError('Max words must be a positive number');
  }

  if (!maxLength && !maxWords) {
    return text;
  }

  let processedText = text;

  if (stripHTML) {
    processedText = processedText.replace(/<[^>]+>/g, '');
  }

  if (maxWords) {
    const words = processedText.split(/\s+/);
    if (words.length <= maxWords) {
      return processedText;
    }
    processedText = words.slice(0, maxWords).join(' ');
    return processedText + ellipsis;
  }

  if (processedText.length <= maxLength) {
    return processedText;
  }

  let trimmedText = processedText.slice(0, maxLength - ellipsis.length);

  if (respectWordBoundaries) {
    const lastSpaceIndex = trimmedText.lastIndexOf(' ');
    if (lastSpaceIndex !== -1) {
      trimmedText = trimmedText.slice(0, lastSpaceIndex);
    }
  }

  return trimmedText + ellipsis;
}

// Utility function to escape special characters in a string for use in a regex
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = { trimText, escapeRegExp };
