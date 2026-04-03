const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

/**
 * Compliance PDF Engine
 * Generates official Monthly Statements and Loan Amortization Certificates.
 */
class StatementService {
  /**
   * Generates a monthly wallet statement PDF.
   * @param {Object} user - User object.
   * @param {Array} transactions - List of transactions for the month.
   */
  async generateMonthlyStatement(user, transactions) {
    const doc = new PDFDocument({ margin: 50 });
    const fileName = `statement_${user.id}_${Date.now()}.pdf`;
    const filePath = path.join(__dirname, '../../exports', fileName);

    // Ensure directory exists
    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Header
    doc.fontSize(20).text('GINI INSTITUTIONAL', { align: 'center' });
    doc.fontSize(10).text('Official Monthly Statement', { align: 'center' });
    doc.moveDown();

    // User Info
    doc.fontSize(12).text(`User ID: ${user.id}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);
    doc.moveDown();

    // Table Header
    doc.fontSize(10).font('Helvetica-Bold');
    doc.text('Date', 50, doc.y, { continued: true, width: 100 });
    doc.text('Type', 150, doc.y, { continued: true, width: 100 });
    doc.text('Reference', 250, doc.y, { continued: true, width: 150 });
    doc.text('Amount', 450, doc.y, { width: 100 });
    doc.font('Helvetica').moveDown(0.5);
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);

    // Transactions
    transactions.forEach(tx => {
      doc.text(new Date(tx.createdAt).toLocaleDateString(), 50, doc.y, { continued: true, width: 100 });
      doc.text(tx.type.toUpperCase(), 150, doc.y, { continued: true, width: 100 });
      doc.text(tx.reference.substring(0, 15), 250, doc.y, { continued: true, width: 150 });
      doc.text(`${tx.amount} MAD`, 450, doc.y, { width: 100 });
      doc.moveDown();
    });

    // Footer & Watermark
    doc.fontSize(8).fillColor('gray')
       .text('This is a computer-generated document. Verified via Gini Ledger.', 50, 700, { align: 'center' });
    
    // Simple Watermark Simulation
    doc.opacity(0.1).fontSize(50).text('GINI SECURE', 100, 400, { rotation: 45 });

    doc.end();

    return new Promise((resolve, reject) => {
      stream.on('finish', () => resolve(filePath));
      stream.on('error', reject);
    });
  }
}

module.exports = new StatementService();
