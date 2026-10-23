/**
 * VSPIAS ECOAUTOMATION — GOOGLE APPS SCRIPT WEB APP INTEGRATION
 * Target Sheet: "VSPIAS Customer Enquiries" (Tab: "Enquiries")
 *
 * Description:
 * Receives direct website enquiry submissions via doPost(e), validates and sanitizes all inputs,
 * prevents duplicates and race conditions using LockService, writes structured records to the
 * "Enquiries" sheet tab, and dispatches a branded confirmation email to the customer with
 * their unique enquiry Reference ID.
 */

// Configuration constants
var CONFIG = {
  SPREADSHEET_NAME: 'VSPIAS Customer Enquiries',
  SHEET_TAB_NAME: 'Enquiries',
  OFFICIAL_EMAIL: 'info@vspias.in',
  OFFICIAL_PHONE: '+91 97831 33333',
  SENDER_NAME: 'VSPIAS Ecoautomation',
  TIMEZONE: 'Asia/Kolkata',
  DEDUPLICATION_WINDOW_MS: 3 * 60 * 1000 // 3 minutes
};

// Standard column headers for the Enquiries tab
var STANDARD_HEADERS = [
  'Reference ID',
  'Timestamp (IST)',
  'Full Name',
  'Email Address',
  'Phone / WhatsApp',
  'Company',
  'Division',
  'Quantity / Capacity',
  'Requirements',
  'Bag Finish',
  'Brand Imprint',
  'Industry Sector',
  'Status'
];

/**
 * Handle GET requests (Health check / verification in browser)
 */
function doGet(e) {
  var output = {
    status: 'online',
    service: 'VSPIAS Customer Enquiries Webhook',
    timestamp: Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss z'),
    message: 'Google Apps Script endpoint is ready to receive POST submissions.'
  };
  return createJsonResponse(output);
}

/**
 * Handle POST requests from the website form
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  var lockAcquired = false;

  try {
    // Acquire lock (wait up to 15 seconds) to prevent concurrent write clashes and duplicate rows
    lockAcquired = lock.tryLock(15000);
    if (!lockAcquired) {
      return createJsonResponse({
        ok: false,
        error: 'The server is currently busy processing other requests. Please try again in a moment.'
      });
    }

    // 1. Parse incoming payload
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        ok: false,
        error: 'No payload received in submission request.'
      });
    }

    var rawData;
    try {
      rawData = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return createJsonResponse({
        ok: false,
        error: 'Malformed request: payload is not valid JSON.'
      });
    }

    // 2. Honeypot check for automated bot spam
    if (rawData.hp || rawData.honeypot || rawData.website_url) {
      // Silently accept without logging or emailing to frustrate bots
      return createJsonResponse({
        ok: true,
        referenceId: 'VSP-SPAM-FILTERED',
        message: 'Enquiry received.'
      });
    }

    // 3. Extract, sanitize, and validate fields
    var name = sanitizeString(rawData.name, 100);
    var email = sanitizeString(rawData.email, 150);
    var phone = sanitizeString(rawData.phone, 25);
    var company = sanitizeString(rawData.company, 150);
    var division = sanitizeString(rawData.division || rawData.interest, 100);
    var quantity = sanitizeString(rawData.quantity, 100);
    var requirements = sanitizeString(rawData.requirements || rawData.message, 3000);
    var bagFinish = sanitizeString(rawData.bagFinish, 150);
    var brandName = sanitizeString(rawData.brandName, 150);
    var industrySector = sanitizeString(rawData.industrySector, 150);
    var consent = rawData.consent === true || rawData.consent === 'true';

    // Strict validation
    if (!name) {
      return createJsonResponse({ ok: false, error: 'Full name is required.' });
    }

    if (!email || !isValidEmail(email)) {
      return createJsonResponse({ ok: false, error: 'A valid email address is required.' });
    }

    if (!division) {
      return createJsonResponse({ ok: false, error: 'Please select an area of interest.' });
    }

    if (!requirements) {
      return createJsonResponse({ ok: false, error: 'Please provide your enquiry requirements.' });
    }

    if (!consent) {
      return createJsonResponse({ ok: false, error: 'Consent to be contacted is required.' });
    }

    // 4. Locate or initialize the Google Sheet & tab
    var sheet = getOrInitEnquiriesSheet();
    if (!sheet) {
      return createJsonResponse({
        ok: false,
        error: 'Unable to access the "VSPIAS Customer Enquiries" spreadsheet. Please verify sheet access.'
      });
    }

    // 5. Duplicate Submission Defense
    // Check if an identical submission was logged within the last 3 minutes
    var duplicateCheck = checkRecentDuplicate(sheet, email, requirements);
    if (duplicateCheck.isDuplicate) {
      return createJsonResponse({
        ok: true,
        referenceId: duplicateCheck.referenceId,
        message: 'Your enquiry was already successfully received. Reference ID: ' + duplicateCheck.referenceId
      });
    }

    // 6. Unique Reference ID
    // If client supplied a valid referenceId (e.g. VS-XXXXXXXX), preserve it so frontend and sheet match
    var referenceId = (rawData.referenceId && /^VS-[A-Z0-9]{6,12}$/i.test(rawData.referenceId))
      ? rawData.referenceId.toUpperCase()
      : ('VS-' + Math.random().toString(36).substring(2, 10).toUpperCase());
    var timestampStr = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss');

    // 7. Write record to the Google Sheet tab
    var recordData = {
      referenceId: referenceId,
      timestamp: timestampStr,
      name: name,
      email: email,
      phone: phone || 'N/A',
      company: company || 'N/A',
      division: division,
      quantity: quantity || 'To be discussed',
      requirements: requirements,
      bagFinish: bagFinish || '—',
      brandName: brandName || '—',
      industrySector: industrySector || '—',
      status: 'New'
    };

    appendRecordToSheet(sheet, recordData);

    // 8. Send Branded Confirmation Email to Customer
    var emailStatus = 'Sent';
    try {
      sendConfirmationEmail(email, name, referenceId, recordData);
    } catch (mailErr) {
      Logger.log('Confirmation email error: ' + mailErr.toString());
      emailStatus = 'Email Failed: ' + mailErr.message;
      // Update sheet status note if email failed, but do not fail the overall submission
      updateLastRowStatus(sheet, emailStatus);
    }

    return createJsonResponse({
      ok: true,
      referenceId: referenceId,
      message: 'Enquiry submitted successfully. Confirmation email sent to ' + email + '.'
    });

  } catch (err) {
    Logger.log('doPost fatal error: ' + err.toString());
    return createJsonResponse({
      ok: false,
      error: 'Server error processing enquiry: ' + err.message
    });
  } finally {
    if (lockAcquired) {
      lock.releaseLock();
    }
  }
}

/**
 * Returns JSON response with proper CORS-friendly headers for Google Apps Script Web Apps
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Sanitizes input string, prevents formula injection, trims whitespace, and limits length
 */
function sanitizeString(val, maxLength) {
  if (val === null || val === undefined) return '';
  var str = String(val).trim();
  if (str.length > maxLength) {
    str = str.substring(0, maxLength);
  }
  // Formula injection defense: prevent Excel/Sheets formula execution if string begins with =, +, -, @
  if (/^[=\+\-@]/.test(str)) {
    str = "'" + str;
  }
  return str;
}

/**
 * Strict email validation regex
 */
function isValidEmail(email) {
  // Disallow CRLF to prevent email header injection
  if (/[\r\n]/.test(email)) return false;
  var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return re.test(email);
}

/**
 * Locate or initialize the spreadsheet and the "Enquiries" tab
 */
function getOrInitEnquiriesSheet() {
  var ss;
  try {
    // 1. Try bound spreadsheet first (if script is attached to sheet via Extensions > Apps Script)
    ss = SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) {
    ss = null;
  }

  // 2. If standalone, search by file name
  if (!ss) {
    var files = DriveApp.getFilesByName(CONFIG.SPREADSHEET_NAME);
    if (files.hasNext()) {
      ss = SpreadsheetApp.open(files.next());
    }
  }

  if (!ss) {
    // If still not found, create new spreadsheet with the requested name
    ss = SpreadsheetApp.create(CONFIG.SPREADSHEET_NAME);
  }

  var sheet = ss.getSheetByName(CONFIG.SHEET_TAB_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_TAB_NAME);
  }

  // Ensure header row exists
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(STANDARD_HEADERS);
    var headerRange = sheet.getRange(1, 1, 1, STANDARD_HEADERS.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#173b30');
    headerRange.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

/**
 * Check if the same email sent the same requirement in the last 3 minutes
 */
function checkRecentDuplicate(sheet, email, requirements) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return { isDuplicate: false };

  var checkCount = Math.min(10, lastRow - 1);
  var startRow = lastRow - checkCount + 1;
  var values = sheet.getRange(startRow, 1, checkCount, sheet.getLastColumn()).getValues();
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  var colMap = mapHeadersToIndexes(headers);
  var now = new Date().getTime();

  for (var i = values.length - 1; i >= 0; i--) {
    var row = values[i];
    var rowEmail = String(row[colMap.email] || '').trim().toLowerCase();
    var rowReq = String(row[colMap.requirements] || '').trim();
    var rowRef = String(row[colMap.referenceId] || '').trim();
    var rowTimeRaw = row[colMap.timestamp];

    if (rowEmail === email.toLowerCase() && rowReq === requirements) {
      if (rowTimeRaw) {
        var rowTime = new Date(rowTimeRaw).getTime();
        if (!isNaN(rowTime) && (now - rowTime) < CONFIG.DEDUPLICATION_WINDOW_MS) {
          return { isDuplicate: true, referenceId: rowRef };
        }
      }
    }
  }

  return { isDuplicate: false };
}

/**
 * Normalizes headers and maps them to standard field keys
 */
function mapHeadersToIndexes(headers) {
  var map = {
    referenceId: 0,
    timestamp: 1,
    name: 2,
    email: 3,
    phone: 4,
    company: 5,
    division: 6,
    quantity: 7,
    requirements: 8,
    bagFinish: 9,
    brandName: 10,
    industrySector: 11,
    status: 12
  };

  for (var c = 0; c < headers.length; c++) {
    var h = String(headers[c] || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (h.indexOf('ref') !== -1 || h === 'id') map.referenceId = c;
    else if (h.indexOf('time') !== -1 || h.indexOf('date') !== -1) map.timestamp = c;
    else if (h.indexOf('name') !== -1 && h.indexOf('brand') === -1) map.name = c;
    else if (h.indexOf('mail') !== -1) map.email = c;
    else if (h.indexOf('phone') !== -1 || h.indexOf('mobile') !== -1 || h.indexOf('whatsapp') !== -1) map.phone = c;
    else if (h.indexOf('comp') !== -1 || h.indexOf('org') !== -1) map.company = c;
    else if (h.indexOf('div') !== -1 || h.indexOf('inter') !== -1 || h.indexOf('cat') !== -1) map.division = c;
    else if (h.indexOf('quant') !== -1 || h.indexOf('cap') !== -1) map.quantity = c;
    else if (h.indexOf('req') !== -1 || h.indexOf('msg') !== -1 || h.indexOf('mess') !== -1) map.requirements = c;
    else if (h.indexOf('finish') !== -1) map.bagFinish = c;
    else if (h.indexOf('brand') !== -1) map.brandName = c;
    else if (h.indexOf('sect') !== -1 || h.indexOf('indus') !== -1) map.industrySector = c;
    else if (h.indexOf('stat') !== -1) map.status = c;
  }

  return map;
}

/**
 * Append record respecting existing header layout
 */
function appendRecordToSheet(sheet, record) {
  var lastCol = sheet.getLastColumn();
  if (lastCol === 0) {
    sheet.appendRow(STANDARD_HEADERS);
    lastCol = STANDARD_HEADERS.length;
  }

  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var colMap = mapHeadersToIndexes(headers);
  var rowData = new Array(lastCol);

  for (var i = 0; i < lastCol; i++) {
    rowData[i] = '';
  }

  rowData[colMap.referenceId] = record.referenceId;
  rowData[colMap.timestamp] = record.timestamp;
  rowData[colMap.name] = record.name;
  rowData[colMap.email] = record.email;
  rowData[colMap.phone] = record.phone;
  rowData[colMap.company] = record.company;
  rowData[colMap.division] = record.division;
  rowData[colMap.quantity] = record.quantity;
  rowData[colMap.requirements] = record.requirements;
  rowData[colMap.bagFinish] = record.bagFinish;
  rowData[colMap.brandName] = record.brandName;
  rowData[colMap.industrySector] = record.industrySector;
  rowData[colMap.status] = record.status;

  sheet.appendRow(rowData);
}

/**
 * Updates status on the last row if email fails
 */
function updateLastRowStatus(sheet, statusText) {
  try {
    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    var colMap = mapHeadersToIndexes(headers);
    sheet.getRange(lastRow, colMap.status + 1).setValue(statusText);
  } catch (e) {
    Logger.log('Could not update last row status: ' + e.toString());
  }
}

/**
 * Sends responsive HTML thank-you confirmation email to customer
 */
function sendConfirmationEmail(customerEmail, customerName, referenceId, record) {
  var subject = 'Thank you for your enquiry [' + referenceId + '] — VSPIAS';

  var plainBody =
    'Dear ' + customerName + ',\n\n' +
    'Thank you for contacting VSPIAS Ecoautomation.\n' +
    'We have received your enquiry regarding ' + record.division + '.\n\n' +
    'Your Enquiry Reference ID: ' + referenceId + '\n' +
    'Timestamp: ' + record.timestamp + ' (IST)\n\n' +
    'Submitted Summary:\n' +
    '• Division: ' + record.division + '\n' +
    '• Company: ' + record.company + '\n' +
    '• Phone / WhatsApp: ' + record.phone + '\n' +
    '• Quantity / Capacity: ' + record.quantity + '\n' +
    (record.bagFinish !== '—' ? ('• Finish: ' + record.bagFinish + '\n') : '') +
    (record.brandName !== '—' ? ('• Brand Imprint: ' + record.brandName + '\n') : '') +
    (record.industrySector !== '—' ? ('• Industry Sector: ' + record.industrySector + '\n') : '') +
    '• Requirements: ' + record.requirements + '\n\n' +
    'What happens next?\n' +
    'Our technical and commercial desk is reviewing your specifications. Paawan Bhargava or a technical specialist will connect with you shortly with detailed parameters and quotation.\n\n' +
    'For urgent questions or quick coordination, you can also reach us directly:\n' +
    '• Email: ' + CONFIG.OFFICIAL_EMAIL + '\n' +
    '• Phone / WhatsApp: ' + CONFIG.OFFICIAL_PHONE + '\n' +
    '• Facility: #66, 6th Main Road, behind UCO Bank, Peenya, Bengaluru 560058, Karnataka, India\n\n' +
    'Best regards,\n' +
    'Paawan Bhargava\n' +
    'VSPIAS Ecoautomation\n' +
    'https://vspias.in';

  var htmlBody =
    '<!DOCTYPE html>' +
    '<html>' +
    '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>' +
    '<body style="margin:0;padding:24px;background-color:#f4f6f3;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:#173b30;">' +
      '<div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;border:1px solid #e1e7e3;overflow:hidden;">' +
        '<div style="background:#173b30;padding:24px 32px;color:#ffffff;">' +
          '<h1 style="margin:0;font-size:22px;letter-spacing:-0.5px;font-weight:700;">VSPIAS</h1>' +
          '<p style="margin:4px 0 0;font-size:12px;opacity:0.8;letter-spacing:1px;text-transform:uppercase;">Packaging Machinery & Ecoautomation</p>' +
        '</div>' +

        '<div style="padding:32px;">' +
          '<div style="display:inline-block;padding:6px 14px;background:#eef4f0;border-radius:4px;color:#173b30;font-size:12px;font-weight:600;margin-bottom:16px;">' +
            'Reference ID: ' + referenceId +
          '</div>' +

          '<h2 style="margin:0 0 12px;font-size:20px;color:#173b30;">Thank you, ' + escapeHtml(customerName) + '.</h2>' +
          '<p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#4a5568;">' +
            'We have received your enquiry and registered it directly in our client communication desk. Our team is reviewing your requirements.' +
          '</p>' +

          '<div style="background:#fafbf9;border:1px solid #e2e8f0;border-radius:6px;padding:20px;margin-bottom:24px;">' +
            '<h3 style="margin:0 0 14px;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;color:#718096;">Enquiry Summary</h3>' +
            '<table style="width:100%;font-size:13px;line-height:1.6;border-collapse:collapse;">' +
              '<tr><td style="padding:4px 0;color:#718096;width:140px;">Division:</td><td style="padding:4px 0;font-weight:600;color:#173b30;">' + escapeHtml(record.division) + '</td></tr>' +
              (record.company !== 'N/A' ? '<tr><td style="padding:4px 0;color:#718096;">Company:</td><td style="padding:4px 0;color:#173b30;">' + escapeHtml(record.company) + '</td></tr>' : '') +
              (record.phone !== 'N/A' ? '<tr><td style="padding:4px 0;color:#718096;">Phone / WhatsApp:</td><td style="padding:4px 0;color:#173b30;">' + escapeHtml(record.phone) + '</td></tr>' : '') +
              '<tr><td style="padding:4px 0;color:#718096;">Quantity / Target:</td><td style="padding:4px 0;color:#173b30;">' + escapeHtml(record.quantity) + '</td></tr>' +
              (record.bagFinish !== '—' ? '<tr><td style="padding:4px 0;color:#718096;">Finish:</td><td style="padding:4px 0;color:#173b30;">' + escapeHtml(record.bagFinish) + '</td></tr>' : '') +
              (record.brandName !== '—' ? '<tr><td style="padding:4px 0;color:#718096;">Brand Imprint:</td><td style="padding:4px 0;color:#173b30;">' + escapeHtml(record.brandName) + '</td></tr>' : '') +
              (record.industrySector !== '—' ? '<tr><td style="padding:4px 0;color:#718096;">Target Sector:</td><td style="padding:4px 0;color:#173b30;">' + escapeHtml(record.industrySector) + '</td></tr>' : '') +
              '<tr><td style="padding:8px 0 4px;color:#718096;vertical-align:top;">Requirements:</td><td style="padding:8px 0 4px;color:#173b30;white-space:pre-wrap;">' + escapeHtml(record.requirements) + '</td></tr>' +
            '</table>' +
          '</div>' +

          '<h3 style="margin:0 0 8px;font-size:14px;color:#173b30;">What is next?</h3>' +
          '<p style="margin:0 0 24px;font-size:13px;line-height:1.6;color:#4a5568;">' +
            'Paawan Bhargava or a technical specialist from our Peenya, Bengaluru desk will review these parameters and provide quotation details and recommendations.' +
          '</p>' +

          '<div style="background:#eef4f0;border-left:4px solid #173b30;padding:16px 20px;border-radius:0 4px 4px 0;font-size:13px;line-height:1.6;color:#173b30;">' +
            '<strong>Direct Point of Contact:</strong><br>' +
            'Paawan Bhargava &middot; <a href="mailto:' + CONFIG.OFFICIAL_EMAIL + '" style="color:#173b30;text-decoration:underline;">' + CONFIG.OFFICIAL_EMAIL + '</a><br>' +
            'Phone / WhatsApp: <a href="tel:+919783133333" style="color:#173b30;text-decoration:underline;">' + CONFIG.OFFICIAL_PHONE + '</a><br>' +
            '#66, 6th Main Road, behind UCO Bank, Peenya, Bengaluru 560058, Karnataka' +
          '</div>' +
        '</div>' +

        '<div style="background:#f9fbf9;padding:16px 32px;font-size:11px;color:#718096;text-align:center;border-top:1px solid #e1e7e3;">' +
          '&copy; ' + new Date().getFullYear() + ' VSPIAS Ecoautomation. All rights reserved.<br>' +
          'This automated confirmation was generated upon submission at <a href="https://vspias.in" style="color:#718096;">vspias.in</a>.' +
        '</div>' +
      '</div>' +
    '</body>' +
    '</html>';

  GmailApp.sendEmail(customerEmail, subject, plainBody, {
    htmlBody: htmlBody,
    name: CONFIG.SENDER_NAME,
    replyTo: CONFIG.OFFICIAL_EMAIL
  });
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
