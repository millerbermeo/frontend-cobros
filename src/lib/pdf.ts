import { pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

export { pdfjs }
export { Document, Page } from 'react-pdf'
export { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
