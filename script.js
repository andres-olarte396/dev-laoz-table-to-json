document.getElementById("processButton").addEventListener("click", async () => {
  const url = document.getElementById("urlInput").value.trim();
  const html = document.getElementById("htmlInput").value.trim();
  const output = document.getElementById("output");

  if (!url && !html) {
    output.textContent = "Please provide either a URL or HTML content.";
    return;
  }

  try {
    let documentToProcess;

    // Fetch content if a URL is provided
    if (url) {
      const response = await fetch(url);
      const text = await response.text();
      const parser = new DOMParser();
      documentToProcess = parser.parseFromString(text, "text/html");
    }
    // Parse provided HTML if entered
    else if (html) {
      const parser = new DOMParser();
      documentToProcess = parser.parseFromString(html, "text/html");
    }

    // Process tables
    const tables = extractTablesWithLinks(documentToProcess);
    output.textContent = JSON.stringify(tables, null, 2);

    // Enable the copy button
    const copyButton = document.getElementById("copyButton");
    copyButton.disabled = false;
  } catch (error) {
    output.textContent = `Error: ${error.message}`;
  }
});

document.getElementById("copyButton").addEventListener("click", () => {
  const output = document.getElementById("output").textContent;
  navigator.clipboard.writeText(output).then(() => {
    alert("Copied to clipboard!");
  }).catch((err) => {
    alert(`Error copying to clipboard: ${err}`);
  });
});

function extractTablesWithLinks(doc) {
  const tables = doc.querySelectorAll("table");
  const tableData = [];

  tables.forEach((table, index) => {
    const headers = [];
    const rows = [];

    // Extract headers
    const headerElements = table.querySelectorAll("thead th, tr:first-child th");
    headerElements.forEach((header) => headers.push(header.textContent.trim()));

    // Extract rows
    const rowElements = table.querySelectorAll("tbody tr, tr:not(:first-child)");
    rowElements.forEach((row) => {
      const rowData = {};
      row.querySelectorAll("td").forEach((cell, i) => {
        // Add cell data to the row
        if (headers[i]) {
          rowData[headers[i]] = cell.textContent.trim();
        }
        // Include link if available
        const linkElement = cell.querySelector("a");
        if (linkElement) {
          rowData["link"] = linkElement.getAttribute("href");
        }
      });

      rows.push(rowData);
    });

    tableData.push({
      tableIndex: index + 1,
      headers: headers.length ? headers : null,
      rows: rows,
    });
  });

  return tableData;
}
