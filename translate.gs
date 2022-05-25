/**
 * Returns the original columns, but if any matching translated column is
 * found it will use that instead. A translation will be considrered matching
 * if its header matches the original, plus the language code.
 */
function translate(originalColumns, translationColumns, languageCode) {
  // Pick out the headers. We'll need to compare them (and process the other data).
  let originalHeaders = originalColumns.shift();
  let translationHeaders = translationColumns.shift();

  for (let row in originalColumns) {
    if (originalColumns[row].join('') == '') break;// Stop if reached an empty line.
    for (let column in originalHeaders) {
      // Look for a matching translated header. If found, insert the translated content.
      let translatedColumn = translationHeaders.indexOf(originalHeaders[column] + languageCode);
      if (translatedColumn > -1) {
        originalColumns[row][column] = translationColumns[row][translatedColumn];
      }
    }
  }

  // Add the (non-translated) headers back on top. And off we go.
  originalColumns.unshift(originalHeaders);
  return originalColumns;
}
