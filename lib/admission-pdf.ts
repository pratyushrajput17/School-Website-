import jsPDF from "jspdf";
import { schoolConfig } from "./school-config";

export interface AdmissionFormData {
  admissionNumber: string;
  scholarNumber: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: string;
  category: string;
  caste: string;
  penNumber: string;
  aadhaarNumber: string;
  mobileNumber: string;
  alternateMobile: string;
  whatsappNumber: string;
  address: string;
  className: string;
  section: string;
  admissionDate: string;
  photoUrl?: string | null;
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function generateAdmissionPDF(data: AdmissionFormData) {
  const doc = new jsPDF("p", "mm", "a4");
  const pw = 210;
  const margin = 20;
  const contentW = pw - margin * 2;
  let y = margin;

  // ── Header ──
  doc.setFillColor(27, 58, 92);
  doc.rect(0, 0, pw, 38, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(schoolConfig.name, pw / 2, 16, { align: "center" });

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(schoolConfig.nameHindi, pw / 2, 22, { align: "center" });

  doc.setFontSize(8);
  doc.text(schoolConfig.contact.address, pw / 2, 28, { align: "center" });
  doc.text(
    `Ph: ${schoolConfig.contact.phone} | ${schoolConfig.contact.altPhone} | Email: ${schoolConfig.contact.email}`,
    pw / 2,
    33,
    { align: "center" }
  );

  y = 46;

  // ── Title ──
  doc.setFillColor(255, 153, 51);
  doc.roundedRect(margin, y, contentW, 10, 1, 1, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("STUDENT ADMISSION FORM", pw / 2, y + 7, { align: "center" });

  y += 16;

  // ── School info line ──
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(`Session: ${schoolConfig.admission.session}`, margin, y);
  doc.text(`Board: ${schoolConfig.board}`, pw / 2, y, { align: "center" });
  doc.text(
    `Date: ${formatDate(data.admissionDate)}`,
    pw - margin,
    y,
    { align: "right" }
  );

  y += 8;

  // ── Helper: draw a row ──
  function drawRow(
    label: string,
    value: string,
    x: number,
    rowY: number,
    w: number
  ) {
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(x, rowY, w, 9, 0.5, 0.5, "F");
    doc.setDrawColor(200, 200, 200);
    doc.roundedRect(x, rowY, w, 9, 0.5, 0.5, "S");

    doc.setTextColor(100, 100, 100);
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.text(label.toUpperCase(), x + 3, rowY + 3.5);

    doc.setTextColor(30, 30, 30);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(value || "—", x + 3, rowY + 7.2);
  }

  // ── Helper: section header ──
  function drawSectionHeader(title: string, atY: number) {
    doc.setFillColor(27, 58, 92);
    doc.roundedRect(margin, atY, contentW, 7, 0.5, 0.5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin + 3, atY + 5);
    return atY + 10;
  }

  // ── Admission & Identity ──
  y = drawSectionHeader("ADMISSION & IDENTITY DETAILS", y);

  const colW = contentW / 3;
  drawRow("SR Number", data.admissionNumber, margin, y, colW - 1);
  drawRow("Scholar Number", data.scholarNumber, margin + colW, y, colW - 1);
  drawRow("Admission Date", formatDate(data.admissionDate), margin + colW * 2, y, colW);
  y += 11;

  drawRow("Category", data.category, margin, y, colW - 1);
  drawRow("Caste", data.caste, margin + colW, y, colW - 1);
  drawRow("PEN Number", data.penNumber, margin + colW * 2, y, colW);
  y += 11;

  drawRow("Aadhaar Number", data.aadhaarNumber, margin, y, colW - 1);
  drawRow(
    "WhatsApp Number",
    data.whatsappNumber,
    margin + colW,
    y,
    colW - 1
  );
  y += 11;

  // ── Student & Parent Details ──
  y = drawSectionHeader("STUDENT & PARENT DETAILS", y);

  drawRow("Student Name", data.studentName, margin, y, contentW);
  y += 11;

  drawRow("Father's Name", data.fatherName, margin, y, (contentW - 2) / 2);
  drawRow(
    "Mother's Name",
    data.motherName,
    margin + (contentW - 2) / 2 + 2,
    y,
    (contentW - 2) / 2
  );
  y += 11;

  drawRow(
    "Date of Birth",
    formatDate(data.dateOfBirth),
    margin,
    y,
    colW - 1
  );
  drawRow("Gender", data.gender || "—", margin + colW, y, colW - 1);
  drawRow(
    "Mobile Number",
    data.mobileNumber,
    margin + colW * 2,
    y,
    colW
  );
  y += 11;

  if (data.alternateMobile) {
    drawRow(
      "Alternate Mobile",
      data.alternateMobile,
      margin,
      y,
      (contentW - 2) / 2
    );
    y += 11;
  }

  // ── Address ──
  y = drawSectionHeader("ADDRESS", y);
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin, y, contentW, 12, 0.5, 0.5, "F");
  doc.setDrawColor(200, 200, 200);
  doc.roundedRect(margin, y, contentW, 12, 0.5, 0.5, "S");
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const addrLines = doc.splitTextToSize(data.address || "—", contentW - 6);
  doc.text(addrLines, margin + 3, y + 5);
  y += 16;

  // ── Class & Section ──
  y = drawSectionHeader("CLASS & SECTION", y);
  drawRow(
    "Class",
    `Class ${data.className}`,
    margin,
    y,
    (contentW - 2) / 2
  );
  drawRow(
    "Section",
    `Section ${data.section}`,
    margin + (contentW - 2) / 2 + 2,
    y,
    (contentW - 2) / 2
  );
  y += 16;

  // ── Photo placeholder (right side) ──
  if (data.photoUrl) {
    try {
      doc.addImage(data.photoUrl, "JPEG", pw - margin - 30, 46, 26, 32);
      doc.setDrawColor(200, 200, 200);
      doc.rect(pw - margin - 30, 46, 26, 32, "S");
    } catch {
      // skip if image fails
    }
  }

  // ── Signature section ──
  y += 10;
  doc.setDrawColor(150, 150, 150);
  doc.setLineWidth(0.3);

  const sigW = 60;
  const sigY = y + 15;

  // Parent signature
  doc.line(margin, sigY, margin + sigW, sigY);
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Parent's Signature", margin + sigW / 2, sigY + 4, {
    align: "center",
  });

  // Principal signature
  doc.line(pw - margin - sigW, sigY, pw - margin, sigY);
  doc.text(
    "Principal's Signature",
    pw - margin - sigW / 2,
    sigY + 4,
    { align: "center" }
  );

  // ── Footer ──
  doc.setFillColor(27, 58, 92);
  doc.rect(0, 282, pw, 15, "F");
  doc.setTextColor(200, 200, 200);
  doc.setFontSize(7);
  doc.text(
    `${schoolConfig.name} · ${schoolConfig.contact.address}`,
    pw / 2,
    287,
    { align: "center" }
  );
  doc.text(
    `Ph: ${schoolConfig.contact.phone} · ${schoolConfig.contact.email}`,
    pw / 2,
    291,
    { align: "center" }
  );

  return doc;
}

export function downloadAdmissionPDF(data: AdmissionFormData) {
  const doc = generateAdmissionPDF(data);
  const fileName = `admission-${data.admissionNumber || "form"}.pdf`;
  doc.save(fileName);
}

export function printAdmissionForm(data: AdmissionFormData) {
  const printWindow = window.open("", "_blank", "width=794,height=1123");
  if (!printWindow) return;

  const dob = formatDate(data.dateOfBirth);
  const admDate = formatDate(data.admissionDate);

  printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
<title>Admission Form - ${data.studentName}</title>
<style>
  @page { size: A4; margin: 15mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e1e1e; font-size: 11px; }

  .header { background: #1B3A5C; color: white; text-align: center; padding: 14px 10px 10px; border-radius: 0 0 6px 6px; margin-bottom: 10px; }
  .header h1 { font-size: 20px; letter-spacing: 1px; }
  .header .hindi { font-size: 12px; margin-top: 2px; opacity: 0.9; }
  .header .info { font-size: 9px; margin-top: 4px; opacity: 0.8; line-height: 1.4; }

  .title-bar { background: #FF9933; color: white; text-align: center; padding: 6px; font-size: 13px; font-weight: 700; letter-spacing: 2px; border-radius: 4px; margin-bottom: 8px; }

  .meta { display: flex; justify-content: space-between; font-size: 9px; color: #666; margin-bottom: 10px; padding: 0 2px; }

  .section-header { background: #1B3A5C; color: white; padding: 4px 10px; font-size: 10px; font-weight: 700; letter-spacing: 1px; border-radius: 3px; margin: 8px 0 6px; }

  .row { display: flex; gap: 6px; margin-bottom: 5px; }
  .field { flex: 1; background: #f5f5f5; border: 1px solid #ddd; border-radius: 3px; padding: 4px 8px; }
  .field .label { font-size: 8px; color: #888; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px; }
  .field .value { font-size: 11px; color: #1e1e1e; margin-top: 1px; font-weight: 500; }

  .address-box { background: #f5f5f5; border: 1px solid #ddd; border-radius: 3px; padding: 6px 10px; margin-bottom: 5px; }

  .signatures { display: flex; justify-content: space-between; margin-top: 30px; padding: 0 20px; }
  .sig-line { border-top: 1px solid #999; width: 180px; text-align: center; padding-top: 4px; font-size: 9px; color: #666; }

  .footer { background: #1B3A5C; color: #ccc; text-align: center; padding: 8px; font-size: 8px; position: fixed; bottom: 0; left: 0; right: 0; }

  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .footer { position: fixed; bottom: 0; }
  }
</style>
</head>
<body>

<div class="header">
  <h1>${schoolConfig.name}</h1>
  <div class="hindi">${schoolConfig.nameHindi}</div>
  <div class="info">${schoolConfig.contact.address}<br>Ph: ${schoolConfig.contact.phone} | ${schoolConfig.contact.altPhone} | Email: ${schoolConfig.contact.email}</div>
</div>

<div class="title-bar">STUDENT ADMISSION FORM</div>

<div class="meta">
  <span>Session: ${schoolConfig.admission.session}</span>
  <span>Board: ${schoolConfig.board}</span>
  <span>Date: ${admDate}</span>
</div>

<div class="section-header">ADMISSION & IDENTITY DETAILS</div>
<div class="row">
  <div class="field"><div class="label">SR Number</div><div class="value">${data.admissionNumber || "—"}</div></div>
  <div class="field"><div class="label">Scholar Number</div><div class="value">${data.scholarNumber || "—"}</div></div>
  <div class="field"><div class="label">Admission Date</div><div class="value">${admDate}</div></div>
</div>
<div class="row">
  <div class="field"><div class="label">Category</div><div class="value">${data.category}</div></div>
  <div class="field"><div class="label">Caste</div><div class="value">${data.caste || "—"}</div></div>
  <div class="field"><div class="label">PEN Number</div><div class="value">${data.penNumber || "—"}</div></div>
</div>
<div class="row">
  <div class="field"><div class="label">Aadhaar Number</div><div class="value">${data.aadhaarNumber || "—"}</div></div>
  <div class="field"><div class="label">WhatsApp Number</div><div class="value">${data.whatsappNumber || "—"}</div></div>
  <div class="field"><div class="label">Mobile Number</div><div class="value">${data.mobileNumber}</div></div>
</div>

<div class="section-header">STUDENT & PARENT DETAILS</div>
<div class="row">
  <div class="field" style="flex:3"><div class="label">Student Name</div><div class="value">${data.studentName}</div></div>
</div>
<div class="row">
  <div class="field"><div class="label">Father's Name</div><div class="value">${data.fatherName}</div></div>
  <div class="field"><div class="label">Mother's Name</div><div class="value">${data.motherName}</div></div>
</div>
<div class="row">
  <div class="field"><div class="label">Date of Birth</div><div class="value">${dob}</div></div>
  <div class="field"><div class="label">Gender</div><div class="value">${data.gender || "—"}</div></div>
  <div class="field"><div class="label">Mobile Number</div><div class="value">${data.mobileNumber}</div></div>
</div>
${data.alternateMobile ? `<div class="row"><div class="field"><div class="label">Alternate Mobile</div><div class="value">${data.alternateMobile}</div></div></div>` : ""}

<div class="section-header">ADDRESS</div>
<div class="address-box">${data.address || "—"}</div>

<div class="section-header">CLASS & SECTION</div>
<div class="row">
  <div class="field"><div class="label">Class</div><div class="value">Class ${data.className}</div></div>
  <div class="field"><div class="label">Section</div><div class="value">Section ${data.section}</div></div>
</div>

<div class="signatures">
  <div class="sig-line">Parent's Signature</div>
  <div class="sig-line">Principal's Signature</div>
</div>

<div class="footer">
  ${schoolConfig.name} · ${schoolConfig.contact.address} · Ph: ${schoolConfig.contact.phone} · ${schoolConfig.contact.email}
</div>

</body></html>
  `);

  printWindow.document.close();
  setTimeout(() => {
    printWindow.print();
  }, 500);
}
