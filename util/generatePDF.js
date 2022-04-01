import jsPDF from "jspdf";
require('jspdf-autotable');

export function generatePDF(heading, fileName, defColumns, rowData) {
  const unit = "pt";
  const size = "A4"; // Use A1, A2, A3 or A4
  const orientation = "portrait"; // portrait or landscape
  const MARFIN_LEFT = 40;
  const doc = new jsPDF(orientation, unit, size);
  doc.setFontSize(15);
  doc.text(heading, MARFIN_LEFT, 40);

  let columnsTitles = [];
  let columnsFields = [];
  let rows = [];
  const generateColumns = defColumns.forEach(c => {
    columnsTitles.push(c.headerName);
    columnsFields.push(c.field);
  });
  const generateRow = rowData.forEach(r => {
    const row = [];
    columnsFields.forEach(c => {
      row.push(r[c]);
    });
    rows.push(row);
  });
  doc.autoTable(columnsTitles, rows, {
    theme: 'grid',
    cellWidth: 'auto',
    headStyles: {
      fillColor: [237, 237, 237],
      lineColor: 212,
      textColor: 20,
      lineWidth: 1
    },
    startY: 50,
  });
  doc.save(fileName);
}
