import { jsPDF } from 'jspdf';
import { articles, EATWELL_URL, guideSections, INSTAGRAM_URL, plannerItems, programs } from '../data/content';
import type { DownloadRequest } from '../types';

const palette = {
  paper: [249, 247, 241] as const,
  ink: [49, 63, 48] as const,
  sage: [89, 108, 75] as const,
  muted: [104, 108, 98] as const,
  line: [218, 221, 209] as const,
};

function newDocument(title: string) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
  doc.setProperties({ title, author: 'Maham | Bridal Nutrition & Wellness', subject: 'Free, self-guided bridal wellbeing resources' });
  return doc;
}

function pageHeader(doc: jsPDF, eyebrow: string, title: string) {
  doc.setFillColor(...palette.paper);
  doc.rect(0, 0, 210, 297, 'F');
  doc.setTextColor(...palette.ink);
  doc.setFont('times', 'normal');
  doc.setFontSize(30);
  doc.text('maham.', 22, 25);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setCharSpace(1.1);
  doc.text('THE BRIDAL DIETITIAN', 188, 23, { align: 'right' });
  doc.setCharSpace(0);
  doc.setDrawColor(...palette.line);
  doc.line(22, 34, 188, 34);
  doc.setTextColor(...palette.sage);
  doc.setFontSize(8);
  doc.setCharSpace(1);
  doc.text(eyebrow.toUpperCase(), 22, 47);
  doc.setCharSpace(0);
  doc.setTextColor(...palette.ink);
  doc.setFont('times', 'normal');
  doc.setFontSize(31);
  const lines: string[] = doc.splitTextToSize(title, 166);
  doc.text(lines, 22, 63, { lineHeightFactor: 1.05 });
  return 68 + (lines.length - 1) * 12;
}

function paragraph(doc: jsPDF, text: string, y: number, options: { size?: number; x?: number; width?: number; muted?: boolean } = {}) {
  const size = options.size || 10.5;
  const lineHeight = size * 0.49;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(size);
  if (options.muted) doc.setTextColor(...palette.muted);
  else doc.setTextColor(...palette.ink);
  const lines: string[] = doc.splitTextToSize(text, options.width || 166);
  doc.text(lines, options.x || 22, y, { lineHeightFactor: 1.39 });
  return y + lines.length * lineHeight;
}

function sectionHeading(doc: jsPDF, text: string, y: number, x = 22) {
  doc.setTextColor(...palette.ink);
  doc.setFont('times', 'normal');
  doc.setFontSize(18);
  doc.text(text, x, y);
  return y + 8;
}

function checkbox(doc: jsPDF, x: number, y: number, checked: boolean) {
  doc.setDrawColor(...palette.sage);
  doc.setLineWidth(0.3);
  doc.setFillColor(...palette.sage);
  doc.roundedRect(x, y, 3.7, 3.7, 0.5, 0.5, checked ? 'FD' : 'S');
  if (checked) {
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.5);
    doc.line(x + 0.7, y + 1.9, x + 1.6, y + 2.8);
    doc.line(x + 1.6, y + 2.8, x + 3.1, y + 0.9);
  }
}

function addFooters(doc: jsPDF) {
  const pages = doc.getNumberOfPages();
  for (let page = 1; page <= pages; page += 1) {
    doc.setPage(page);
    doc.setDrawColor(...palette.line);
    doc.setLineWidth(0.25);
    doc.line(22, 271, 188, 271);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...palette.sage);
    doc.textWithLink('@maham.bridaldietitian', 22, 278, { url: INSTAGRAM_URL });
    doc.text(`${page} / ${pages}`, 188, 278, { align: 'right' });
    paragraph(doc, 'General education for adults, not personalised medical advice. For individual needs, please consult a qualified healthcare professional.', 284, { size: 7.2, muted: true });
  }
}

export function downloadPdf(request: DownloadRequest) {
  let doc: jsPDF;
  let filename: string;

  if (request.kind === 'guide') {
    doc = newDocument('Maham | A Little Nourishment, A Lot of Glow');
    filename = 'maham-bridal-wellness-guide.pdf';
    guideSections.forEach((section, index) => {
      if (index > 0) doc.addPage();
      let y = pageHeader(doc, `Your bridal wellness guide / 0${index + 1}`, section.title);
      y = paragraph(doc, section.intro, y + 6, { size: 11, muted: true }) + 12;
      section.points.forEach(([title, body]) => {
        y = sectionHeading(doc, title, y);
        y = paragraph(doc, body, y) + 10;
      });
      if (index === 3) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...palette.sage);
        doc.textWithLink('Further reading: NHS - The Eatwell Guide', 22, Math.min(y + 4, 259), { url: EATWELL_URL });
      }
    });
  } else if (request.kind === 'planner') {
    doc = newDocument('Maham | Your Bridal Wellness Checklist');
    filename = 'maham-your-wellness-checklist.pdf';
    let y = pageHeader(doc, 'One small step at a time', 'Your wellness checklist.');
    y = paragraph(doc, 'A few gentle reminders, before the day and beautifully beyond. This is support, not another list to perfect.', y + 5, { muted: true }) + 11;
    const groups = [...new Set(plannerItems.map((item) => item.group))];
    groups.forEach((group, index) => {
      y = sectionHeading(doc, `0${index + 1} / ${group}`, y);
      plannerItems.filter((item) => item.group === group).forEach((item) => {
        checkbox(doc, 22, y - 3, request.completed.includes(item.id));
        y = paragraph(doc, item.text, y, { x: 30, width: 156 }) + 6;
      });
      y += 7;
    });
    const total = plannerItems.filter((item) => request.completed.includes(item.id)).length;
    paragraph(doc, `${total} of ${plannerItems.length} little acts of care checked off. Your progress is a reminder, not a measure of your worth.`, Math.min(y + 1, 253), { size: 9, muted: true });
  } else if (request.kind === 'program') {
    const program = programs.find((item) => item.id === request.programId);
    if (!program) throw new Error('The requested path could not be found.');
    doc = newDocument(`Maham | ${program.title}`);
    filename = `maham-${program.id}.pdf`;
    for (let page = 0; page < 2; page += 1) {
      if (page > 0) doc.addPage();
      let y = pageHeader(doc, 'Your free, self-guided path', program.title);
      y = paragraph(doc, program.focus, y + 6, { muted: true }) + 13;
      program.steps.slice(page * 2, page * 2 + 2).forEach((step, index) => {
        checkbox(doc, 22, y - 4, request.completed.includes(step.id));
        y = sectionHeading(doc, `0${page * 2 + index + 1} / ${step.title}`, y, 30);
        y = paragraph(doc, step.body, y) + 7;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...palette.sage);
        doc.text('A LITTLE ACTION', 22, y);
        y = paragraph(doc, step.action, y + 6, { size: 10 }) + 14;
      });
      paragraph(doc, 'Go at your own pace. Mark each step when it feels complete, and return to anything that helps.', 254, { size: 9, muted: true });
    }
  } else {
    const article = articles.find((item) => item.id === request.articleId);
    if (!article?.recipe) throw new Error('The requested recipe could not be found.');
    const { recipe } = article;
    doc = newDocument(`Maham | ${article.title}`);
    filename = `maham-${article.id}.pdf`;
    let y = pageHeader(doc, `A little recipe / ${recipe.prep} / Serves ${request.servings}`, article.title);
    y = paragraph(doc, article.excerpt, y + 5, { muted: true }) + 10;
    y = sectionHeading(doc, 'A little of this...', y);
    recipe.ingredients.forEach((ingredient) => {
      y = paragraph(doc, `${ingredient.quantity * request.servings} ${ingredient.unit} ${ingredient.name}`, y, { size: 10 }) + 3;
    });
    y = sectionHeading(doc, 'And a little time.', y + 6);
    recipe.steps.forEach((step, index) => {
      y = paragraph(doc, `${index + 1}. ${step}`, y, { size: 10 }) + 4;
    });
    paragraph(doc, recipe.note, y + 6, { size: 8.5, muted: true });
  }

  addFooters(doc);
  doc.save(filename);
}