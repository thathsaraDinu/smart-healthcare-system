import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function reportGeneration(data, title) {
  const doc = new jsPDF();
  const date = new Date();
  const dateString = date.toLocaleDateString();
  const timeString = date.toLocaleTimeString();

  // Add title
  doc.setFontSize(18);
  doc.text(title, 14, 22);

  // Add date and time
  doc.setFontSize(12);
  doc.text(`Date: ${dateString}`, 14, 32);
  doc.text(`Time: ${timeString}`, 14, 38);

  // Add table
  const tableColumn = Object.keys(data[0]);
  const tableRows = data.map((item) => Object.values(item));

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 50,
  });

  // Initiate a variable to save date&time for the file name
  const currentTime = new Date()
    .toISOString()
    .replace(/:/g, '-'); 

  // Save PDF
  doc.save(`${title}_${currentTime}.pdf`);
}
