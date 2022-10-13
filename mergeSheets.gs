/**
 * Creates a single table from multiple selected tables, using only data in columns
 * where headers are represented in _all_ selected tables.
 */
function mergeSheets() {
  // The tables are collected from _all_ arguments passed to the function.
  let tables = arguments;

  // Build data for the position of each column header in each table.  
  let headerData = {};
  for (let i in tables) {
    for (let j in tables[i][0]) {
      let h = tables[i][0][j];
      if (!headerData[h])
        headerData[h] = {};
      headerData[h][i] = j;
    }
  }

  // Add data for each column where the header is represented in all tables.
  let output = [];
  for (let h in headerData) {
    if (Object.keys(headerData[h]).length == tables.length) {
      // Add header, then all column content for all tables.
      let line = [h];
      for (let t in headerData[h]) {
        let row = 1;
        while (tables[t][row].join('') != '') {
          line.push(tables[t][row][headerData[h][t]]);
          row++;
        }
      }
      output.push(line);
    }
  }

  // Flip and return the table. (For coding convenience it has been built in the wrong direction.)
  return output[0].map((_, colIndex) => output.map(row => row[colIndex]));
}
