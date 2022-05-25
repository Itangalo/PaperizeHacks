/**
 * Creates rows for front and backsides of cards (or other components).
 * 
 * @param {sheetColumns} frontLayerData: The columns contaning layer data for the front of the cards, eg. 'A:D'.
 * @param {sheetColumns} backLayerData: The columns contaning layer data for the back of the cards, eg. 'E:F'.
 * @param {number} rowsPerPage: The number of rows with cards on a printed page. Defaults to 3.
 * @param {number} columnsPerPage: The number of columns with cards on a printed page. Defaults to 3.
 * @param {boolean} flipBackRows: Whether to flip each row on the backside. Useful for double-sided printing flipped horizontally.
 * @param {boolean} flipBackColumns: Whether to flip each column on the backside. Useful for double-sided printing flipped vertically.
 *
 * @return A matrix of data, including headers, meant to be returned right into a sheet.
 */
function generateBacksides(frontLayerData, backLayerData, rowsPerPage = 3, columnsPerPage = 3, flipBackRows = false, flipbackColumns = false) {
  // Validate some data.
  if (frontLayerData.length != backLayerData.length || frontLayerData.length < 2)
    throw('Number of rows for front and back must be equal and include at least header and one row.');
  if (rowsPerPage < 1 || columnsPerPage < 1)
    throw('Number of rows and columns per page must be at least 1.');

  // Create header row.
  let emptyFrontRow = new Array(frontLayerData[0].length).fill(null);
  let emptyBackRow = new Array(backLayerData[0].length).fill(null);
  let frontHeaders = frontLayerData.shift();
  let backHeaders = backLayerData.shift();
  let output = [[...frontHeaders, ...backHeaders]];

  // Go through all lines in the input and build front and back pages.
  while (frontLayerData.length && frontLayerData[0].join('') != '') {
    // Two empty containers for front and back components, to be populated.
    let page = [];
    let backPage = [];

    for (let r = 0; r < rowsPerPage; r++) {
      let row = [];
      let backRow = [];
      for (let c = 0; c < columnsPerPage; c++) {
        row.push([...(frontLayerData.shift() || emptyFrontRow), ...emptyBackRow]);
        backRow.push([...emptyFrontRow, ...(backLayerData.shift() || emptyBackRow)]);
      }

      if (flipBackRows)
        backRow.reverse();
      page.push(row);
      backPage.push(backRow);
    }

    // Add the front and back page to the processed pages.
    if (flipbackColumns)
      backPage.reverse();
    for (let row of page)
      for (let c of row)
        output.push(c);
      for (let row of backPage)
        for (let c of row)
          output.push(c);
  }

  return output;
}
