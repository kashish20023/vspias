// WEBSITE ENQUIRY INTEGRATION & AUTOMATION
// VSPIAS Ecoautomation Pvt. Ltd.

const WEBSITE_CONFIG = {
  SHEET_ID: "1oOEB3vGQdl7W7Ri2L5mdm83MXaMA_BzmVEEo0xvUHio",
  SHEET_NAME: "VSPIAS Customer Enquiries",
  BUSINESS_EMAIL: "info@vspias.in",
  BUSINESS_NAME: "VSPIAS Ecoautomation Pvt. Ltd."
};

function doPost(e) {
  let rowNumber = 0;
  let referenceId = "";
  let sheet;

  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No enquiry data received.");
    }

    const data = JSON.parse(e.postData.contents);

    // Optional spam honeypot: hidden field should remain empty.
    if (data.website || data.hp) {
      return jsonResponse({ success: true });
    }

    const name = cleanWebsiteValue(data.name || data.customerName);
    const email = cleanWebsiteValue(data.email || data.customerEmail).toLowerCase();
    const company = cleanWebsiteValue(data.company);
    const phone = cleanWebsiteValue(data.phone);
    const division = cleanWebsiteValue(
      data.division || data.interest || data.productOrService
    );
    const product = cleanWebsiteValue(
      data.product || data.model || data.quantity
    );
    const message = cleanWebsiteValue(
      data.message || data.requirements || data.enquiryMessage
    );
    const bagFinish = cleanWebsiteValue(data.bagFinish);
    const brandName = cleanWebsiteValue(data.brandName);
    const industrySector = cleanWebsiteValue(data.industrySector);

    if (!name || !email || !message) {
      throw new Error("Name, valid email, and requirements are required.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid customer email address.");
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(15000);

    try {
      const ss = SpreadsheetApp.openById(WEBSITE_CONFIG.SHEET_ID);
      sheet = ss.getSheetByName(WEBSITE_CONFIG.SHEET_NAME) || ss.getSheets()[0];

      if (!sheet) {
        throw new Error(
          'Sheet tab "' + WEBSITE_CONFIG.SHEET_NAME + '" was not found.'
        );
      }

      referenceId =
        (data.referenceId && /^VS-[A-Z0-9]{6,12}$/i.test(data.referenceId))
          ? data.referenceId.toUpperCase()
          : ("VS-" + Utilities.getUuid().split("-")[0].toUpperCase());

      const subject =
        "Website Enquiry - " + (division || "General") + " - " + referenceId;

      const enquiryMessage = [
        "Reference ID: " + referenceId,
        "Company: " + company,
        "Phone: " + phone,
        "Product / Model / Quantity: " + product,
        bagFinish ? ("Bag Finish: " + bagFinish) : "",
        brandName ? ("Brand Imprint: " + brandName) : "",
        industrySector ? ("Target Sector: " + industrySector) : "",
        "Division: " + division,
        "Requirements: " + message
      ].filter(Boolean).join("\n");

      // Existing sheet columns:
      // A Received At, B Customer Name, C Customer Email, D Subject,
      // E Enquiry Message, F Division, G Auto-Reply Status, H Gmail Message ID.
      sheet.appendRow([
        new Date(),
        safeWebsiteCell(name),
        safeWebsiteCell(email),
        safeWebsiteCell(subject),
        safeWebsiteCell(enquiryMessage),
        safeWebsiteCell(division || "Other / Review"),
        "Pending",
        "WEB-" + referenceId
      ]);

      rowNumber = sheet.getLastRow();

      // =========================================================================
      // 1. SEND LEAD NOTIFICATION TO info@vspias.in (ADMIN DESK)
      // =========================================================================
      try {
        const adminSubject = "🔔 New Website Enquiry [" + referenceId + "]: " + name + " - " + (division || "General");
        
        const adminPlainBody =
          "NEW WEBSITE ENQUIRY RECEIVED\n" +
          "============================\n\n" +
          "Reference ID: " + referenceId + "\n" +
          "Date / Time:  " + new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " (IST)\n\n" +
          "CLIENT DETAILS:\n" +
          "• Full Name:       " + name + "\n" +
          "• Email Address:   " + email + "\n" +
          "• Phone / WhatsApp:" + (phone || "N/A") + "\n" +
          "• Company / Org:   " + (company || "N/A") + "\n\n" +
          "PROJECT SPECIFICATIONS:\n" +
          "• Division:        " + (division || "General") + "\n" +
          "• Target Quantity: " + (product || "To be discussed") + "\n" +
          (bagFinish ? ("• Bag Finish:      " + bagFinish + "\n") : "") +
          (brandName ? ("• Brand Imprint:   " + brandName + "\n") : "") +
          (industrySector ? ("• Target Sector:   " + industrySector + "\n") : "") +
          "\nREQUIREMENTS / MESSAGE:\n" +
          message + "\n\n" +
          "---\n" +
          "Direct Reply: Reply to this email to contact " + name + " directly (" + email + ").\n" +
          "Delivered by VSPIAS Website Webhook.";

        const phoneClean = String(phone || "").replace(/[^0-9+]/g, "");
        const waNumber = phoneClean.replace(/^\+/, "");

        const adminHtmlBody =
          '<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#173b30;background:#f5f3eb;padding:24px;">' +
            '<div style="background:#173b30;color:#fffef9;padding:20px 24px;border-radius:8px;">' +
              '<p style="color:#dbe999;font-size:11px;letter-spacing:1.5px;margin:0 0 6px;text-transform:uppercase;font-weight:700;">VSPIAS ECOAUTOMATION — NEW LEAD</p>' +
              '<h2 style="margin:0;font-size:20px;color:#fffef9;">New Website Customer Enquiry</h2>' +
            '</div>' +
            '<div style="padding:24px;background:#fffef9;margin-top:12px;border-radius:8px;line-height:1.7;">' +
              '<div style="background:#eef4f0;border-left:4px solid #173b30;padding:12px 16px;border-radius:0 4px 4px 0;margin-bottom:18px;">' +
                '<div style="font-size:11px;color:#527163;font-weight:700;text-transform:uppercase;">Reference ID</div>' +
                '<div style="font-size:18px;font-weight:700;color:#173b30;font-family:monospace;">' + escapeWebsiteHtml(referenceId) + '</div>' +
              '</div>' +
              '<h3 style="margin:0 0 10px;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;color:#173b30;border-bottom:1px solid #e1e7e3;padding-bottom:4px;">Client Contact Information</h3>' +
              '<p style="margin:6px 0;font-size:13px;">' +
                '<strong>Name:</strong> ' + escapeWebsiteHtml(name) + '<br>' +
                '<strong>Email:</strong> <a href="mailto:' + escapeWebsiteHtml(email) + '" style="color:#0f5132;font-weight:600;">' + escapeWebsiteHtml(email) + '</a><br>' +
                '<strong>Phone / WhatsApp:</strong> <a href="tel:' + escapeWebsiteHtml(phone) + '" style="color:#0f5132;">' + escapeWebsiteHtml(phone || "N/A") + '</a>' +
                (waNumber ? ' &middot; <a href="https://wa.me/' + waNumber + '" style="color:#128c7e;font-weight:600;" target="_blank">Open WhatsApp ↗</a>' : '') + '<br>' +
                '<strong>Company:</strong> ' + escapeWebsiteHtml(company || "N/A") +
              '</p>' +
              '<h3 style="margin:18px 0 10px;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;color:#173b30;border-bottom:1px solid #e1e7e3;padding-bottom:4px;">Enquiry Specifications</h3>' +
              '<p style="margin:6px 0;font-size:13px;">' +
                '<strong>Division / Interest:</strong> ' + escapeWebsiteHtml(division || "General") + '<br>' +
                '<strong>Quantity / Capacity:</strong> ' + escapeWebsiteHtml(product || "To be discussed") + '<br>' +
                (bagFinish ? ('<strong>Bag Finish:</strong> ' + escapeWebsiteHtml(bagFinish) + '<br>') : '') +
                (brandName ? ('<strong>Brand Imprint:</strong> ' + escapeWebsiteHtml(brandName) + '<br>') : '') +
                (industrySector ? ('<strong>Target Sector:</strong> ' + escapeWebsiteHtml(industrySector) + '<br>') : '') +
              '</p>' +
              '<h3 style="margin:18px 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;color:#173b30;">Requirements & Message</h3>' +
              '<div style="background:#fafbf9;border:1px solid #e2e8f0;border-radius:6px;padding:14px 16px;font-size:13px;line-height:1.6;white-space:pre-wrap;color:#173b30;">' +
                escapeWebsiteHtml(message) +
              '</div>' +
              '<div style="text-align:center;margin-top:20px;padding:12px;background:#f5f3eb;border-radius:6px;">' +
                '<a href="mailto:' + escapeWebsiteHtml(email) + '?subject=' + encodeURIComponent("Re: VSPIAS Enquiry [" + referenceId + "]") + '" style="display:inline-block;background:#173b30;color:#ffffff;text-decoration:none;padding:10px 20px;border-radius:4px;font-size:13px;font-weight:600;margin-right:8px;">Reply to Customer ↗</a>' +
                (waNumber ? '<a href="https://wa.me/' + waNumber + '" style="display:inline-block;background:#25d366;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:4px;font-size:13px;font-weight:600;" target="_blank">Chat on WhatsApp ↗</a>' : '') +
              '</div>' +
              '<p style="margin-top:16px;font-size:11px;color:#6b7280;text-align:center;">' +
                'Tip: Client ko reply dene ke liye bas is email par direct <strong>Reply</strong> karein.' +
              '</p>' +
            '</div>' +
          '</div>';

        MailApp.sendEmail({
          to: WEBSITE_CONFIG.BUSINESS_EMAIL,
          subject: adminSubject,
          body: adminPlainBody,
          htmlBody: adminHtmlBody,
          name: "VSPIAS Website Form",
          replyTo: email
        });
      } catch (adminMailError) {
        console.error("Admin notification email error:", adminMailError);
      }

      // =========================================================================
      // 2. SEND CONFIRMATION TO CUSTOMER (to: email)
      // =========================================================================
      const plainBody =
        "Dear " + name + ",\n\n" +
        "Thank you for reaching out to VSPIAS Ecoautomation Pvt. Ltd.\n\n" +
        "We have successfully received your enquiry. Our team will review " +
        "your requirements and get in touch with you regarding the most " +
        "suitable solution for your business.\n\n" +
        "Your Enquiry Summary\n" +
        "Reference ID: " + referenceId + "\n" +
        "Requirement: " + (product || message) + "\n" +
        "Division: " + (division || "Other / Review") + "\n\n" +
        "How can we help you?\n" +
        "Whether you need industrial automation products and control " +
        "solutions or customised, sustainable paper packaging, our team " +
        "is here to help you explore the right options.\n\n" +
        "You can reply to this email with additional specifications, " +
        "quantities, technical details, or project requirements.\n\n" +
        "Explore our solutions:\n" +
        "Industrial Automation: https://vspias.in/automation\n" +
        "Paper Packaging: https://vspias.in/paper-bags\n\n" +
        "Thank you for considering VSPIAS as your business partner.\n\n" +
        "Best regards,\nTeam VSPIAS\n" +
        "VSPIAS Ecoautomation Pvt. Ltd.\n" +
        "Industrial Automation | Sustainable Paper Packaging\n" +
        "https://vspias.in/\n\n" +
        "This is an automated confirmation that your enquiry has been received.";

      const htmlBody =
        "<p>Dear " + escapeWebsiteHtml(name) + ",</p>" +
        "<p>Thank you for reaching out to <strong>VSPIAS Ecoautomation Pvt. Ltd.</strong></p>" +
        "<p>We have successfully received your enquiry. Our team will review your requirements and get in touch with you regarding the most suitable solution for your business.</p>" +
        "<h3>Your Enquiry Summary</h3>" +
        "<p><strong>Reference ID:</strong> " + referenceId + "<br>" +
        "<strong>Requirement:</strong> " + escapeWebsiteHtml(product || message) + "<br>" +
        "<strong>Division:</strong> " + escapeWebsiteHtml(division || "Other / Review") + "</p>" +
        "<h3>How can we help you?</h3>" +
        "<p>Whether you need industrial automation products and control solutions or customised, sustainable paper packaging, our team is here to help you explore the right options for your requirements.</p>" +
        "<p>You can reply to this email with any additional specifications, quantities, technical details, or project requirements.</p>" +
        "<p>Explore our solutions:<br>" +
        '<a href="https://vspias.in/automation">Industrial Automation</a><br>' +
        '<a href="https://vspias.in/paper-bags">Paper Packaging</a></p>' +
        "<p>Thank you for considering VSPIAS as your business partner. We look forward to connecting with you.</p>" +
        "<p>Best regards,<br>Team VSPIAS<br>" +
        "VSPIAS Ecoautomation Pvt. Ltd.<br>" +
        "Industrial Automation | Sustainable Paper Packaging<br>" +
        '<a href="https://vspias.in/">https://vspias.in/</a></p>' +
        "<small>This is an automated confirmation that your enquiry has been received. You can reply directly to this email to share additional details.</small>";

      try {
        MailApp.sendEmail({
          to: email,
          subject: "We received your enquiry | VSPIAS - " + referenceId,
          body: plainBody,
          htmlBody: htmlBody,
          name: WEBSITE_CONFIG.BUSINESS_NAME,
          replyTo: WEBSITE_CONFIG.BUSINESS_EMAIL
        });

        sheet.getRange(rowNumber, 7).setValue("Sent");
      } catch (mailError) {
        sheet.getRange(rowNumber, 7).setValue(
          "Failed - " + String(mailError.message || mailError).slice(0, 180)
        );
      }

    } finally {
      lock.releaseLock();
    }

    return jsonResponse({
      success: true,
      referenceId: referenceId
    });

  } catch (error) {
    console.error("Website enquiry error:", error);

    return jsonResponse({
      success: false,
      message: "The enquiry could not be processed. Please try again."
    });
  }
}

function cleanWebsiteValue(value) {
  return String(value == null ? "" : value)
    .trim()
    .slice(0, 5000);
}

function safeWebsiteCell(value) {
  const text = String(value == null ? "" : value);
  // Prevent spreadsheet formula injection.
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function escapeWebsiteHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[ch];
  });
}

function jsonResponse(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}

const CONFIG = {
  SHEET_ID: "1oOEB3vGQdl7W7Ri2L5mdm83MXaMA_BzmVEEo0xvUHio",
  SHEET_NAME: "VSPIAS Customer Enquiries",
  BUSINESS_EMAIL: "info@vspias.in",
  BUSINESS_NAME: "VSPIAS Ecoautomation Pvt. Ltd.",
  SITE_URL: "https://vspias.in",
  LOOKBACK_DAYS: 7
};

const HEADERS = [
  "Received At",
  "Customer Name",
  "Customer Email",
  "Subject",
  "Enquiry Message",
  "Division",
  "Auto-Reply Status",
  "Gmail Message ID"
];

function setup() {
  const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) sheet = ss.insertSheet(CONFIG.SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }

  // Create one recurring trigger, without duplicates.
  const exists = ScriptApp.getProjectTriggers().some(
    t => t.getHandlerFunction() === "processEnquiries"
  );

  if (!exists) {
    ScriptApp.newTrigger("processEnquiries")
      .timeBased()
      .everyMinutes(5)
      .create();
  }
}

function processEnquiries() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return;

  try {
    const sheet = SpreadsheetApp
      .openById(CONFIG.SHEET_ID)
      .getSheetByName(CONFIG.SHEET_NAME);

    if (!sheet) throw new Error("Run setup() first.");

    const processed = new Set();

    if (sheet.getLastRow() > 1) {
      sheet.getRange(2, 8, sheet.getLastRow() - 1, 1)
        .getValues()
        .flat()
        .filter(String)
        .forEach(id => processed.add(String(id)));
    }

    const query =
      `in:inbox newer_than:${CONFIG.LOOKBACK_DAYS}d ` +
      `-from:${CONFIG.BUSINESS_EMAIL}`;

    const threads = GmailApp.search(query, 0, 100);

    for (const thread of threads) {
      for (const message of thread.getMessages()) {
        const id = message.getId();
        if (processed.has(id)) continue;

        const sender = parseAddress(message.getFrom());
        const subject = message.getSubject() || "(No subject)";
        const body = message.getPlainBody() || "";
        const receivedAt = message.getDate();

        // Never process messages sent by the business mailbox itself.
        if (sender === CONFIG.BUSINESS_EMAIL.toLowerCase()) continue;

        // Skip obvious automated messages and delivery failures.
        if (isAutomatedMessage(message, sender)) continue;

        const customerEmail = findCustomerEmail(message, body);

        // Save the enquiry even if the sender cannot be safely identified.
        const customerName = extractName(message.getFrom());
        const division = detectDivision(subject + " " + body);

        const row = sheet.getLastRow() + 1;

        sheet.appendRow([
          receivedAt,
          safeCell(customerName),
          safeCell(customerEmail || ""),
          safeCell(subject),
          safeCell(body.slice(0, 40000)),
          division,
          customerEmail ? "Pending" : "Skipped - verify customer email",
          id
        ]);

        // Mark the ID locally to avoid duplicate handling in this run.
        processed.add(id);

        if (!customerEmail) continue;

        try {
          sendThankYou(customerEmail, customerName, subject, division);

          sheet.getRange(row, 7).setValue("Sent");
        } catch (error) {
          sheet.getRange(row, 7)
            .setValue("Failed - " + String(error).slice(0, 180));
        }
      }
    }
  } finally {
    lock.releaseLock();
  }
}

function findCustomerEmail(message, body) {
  const replyTo = parseAddress(message.getReplyTo() || "");

  // Reply-To is useful for website notifications, but reject the
  // business mailbox and automated addresses.
  if (isCustomerAddress(replyTo)) return replyTo;

  const sender = parseAddress(message.getFrom());

  // For direct customer emails, the sender is the customer.
  if (isCustomerAddress(sender) &&
      !sender.endsWith("@vspias.in")) {
    return sender;
  }

  // For website notifications sent from the business domain,
  // try to find a clearly labelled customer email in the body.
  const patterns = [
    /(?:customer\s*)?e-?mail(?:\s*address)?\s*[:\-]\s*([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/i,
    /(?:your\s*)?email\s*[:\-]\s*([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/i
  ];

  for (const pattern of patterns) {
    const match = body.match(pattern);
    if (match && isCustomerAddress(match[1].toLowerCase())) {
      return match[1].toLowerCase();
    }
  }

  return "";
}

function sendThankYou(to, customerName, subject, division) {
  const greeting = escapeHtml(customerName || "there");
  const ref = "VS-" + Utilities.getUuid().slice(0, 8).toUpperCase();

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:620px;
      margin:auto;color:#173b30;background:#f5f3eb;padding:24px">
      <div style="background:#173b30;color:#fffef9;padding:24px;
        border-radius:12px">
        <p style="color:#dbe999;font-size:12px;letter-spacing:2px">
          VSPIAS ECOAUTOMATION
        </p>
        <h2>Thank you for reaching out.</h2>
        <p>We've successfully received your enquiry.</p>
      </div>
      <div style="padding:24px;background:#fffef9;margin-top:12px;
        border-radius:12px;line-height:1.7">
        <p>Dear ${greeting},</p>
        <p>Thank you for reaching out to
          <strong>VSPIAS Ecoautomation Pvt. Ltd.</strong></p>
        <p>We've successfully received your enquiry. Our team will
          review your requirements and get in touch with you regarding
          the most suitable solution for your business.</p>
        <h3>Your Enquiry Summary</h3>
        <p><strong>Reference ID:</strong> ${ref}<br>
        <strong>Requirement:</strong> ${escapeHtml(subject)}<br>
        <strong>Division:</strong> ${escapeHtml(division)}</p>
        <h3>How can we help you?</h3>
        <p>Whether you need industrial automation products and control
          solutions or customised, sustainable paper packaging, our team
          is here to help you explore the right options for your requirements.</p>
        <p>To help us assist you more efficiently, you can reply to this
          email with any additional specifications, quantities, technical
          details, or project requirements.</p>
        <p><a href="https://vspias.in/automation">Industrial Automation</a><br>
        <a href="https://vspias.in/paper-bags">Paper Packaging</a></p>
        <p>Thank you for considering VSPIAS as your business partner.
          We look forward to connecting with you.</p>
        <p>Best regards,<br><strong>Team VSPIAS</strong><br>
          VSPIAS Ecoautomation Pvt. Ltd.<br>
          Industrial Automation | Sustainable Paper Packaging<br>
          <a href="https://vspias.in">vspias.in</a></p>
        <hr style="border:0;border-top:1px solid #d8ddd3">
        <small>This is an automated confirmation that your enquiry
          has been received. You can reply directly to this email
          to share additional details.</small>
      </div>
    </div>`;

  const plainText =
`Dear ${customerName || "Customer"},

Thank you for reaching out to VSPIAS Ecoautomation Pvt. Ltd.

We've successfully received your enquiry. Our team will review your
requirements and get in touch with you regarding the most suitable
solution for your business.

Your Enquiry Summary
Reference ID: ${ref}
Requirement: ${subject}
Division: ${division}

Whether you need industrial automation products and control solutions
or customised, sustainable paper packaging, our team is here to help.

You can reply to this email with additional specifications, quantities,
technical details, or project requirements.

Industrial Automation: https://vspias.in/automation
Paper Packaging: https://vspias.in/paper-bags

Best regards,
Team VSPIAS
VSPIAS Ecoautomation Pvt. Ltd.
https://vspias.in`;

  GmailApp.sendEmail(to, "Thank you for contacting VSPIAS", plainText, {
    htmlBody: html,
    name: CONFIG.BUSINESS_NAME,
    replyTo: CONFIG.BUSINESS_EMAIL
  });
}

function isAutomatedMessage(message, sender) {
  const subject = (message.getSubject() || "").toLowerCase();
  const headers = message.getRawContent().slice(0, 12000).toLowerCase();

  return (
    /no.?reply|mailer-daemon|postmaster/.test(sender) ||
    /delivery status notification|undeliverable|out of office|automatic reply|auto.?reply/.test(subject) ||
    headers.includes("auto-submitted: auto-generated") ||
    headers.includes("auto-submitted: auto-replied") ||
    headers.includes("precedence: bulk")
  );
}

function isCustomerAddress(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    email !== CONFIG.BUSINESS_EMAIL.toLowerCase() &&
    !/^(no-?reply|mailer-daemon|postmaster)@/i.test(email);
}

function parseAddress(value) {
  const match = String(value).match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match ? match[0].toLowerCase() : "";
}

function extractName(from) {
  const match = String(from).match(/^\s*"?([^"<]+)"?\s*</);
  return match ? match[1].trim() : "";
}

function detectDivision(text) {
  const t = text.toLowerCase();

  if (/paper bag|kraft|packaging|bag studio|paper roll/.test(t)) {
    return "Paper Packaging";
  }

  if (/automation|plc|vfd|drive|hmi|switchgear|contactor|control panel|schneider|siemens|abb|l&t/.test(t)) {
    return "Industrial Automation";
  }

  return "Other / Review";
}

function safeCell(value) {
  const s = String(value || "");
  // Prevent spreadsheet formula injection from incoming email content.
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[ch]);
}