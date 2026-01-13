import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportToPdf(elementId: string, fileName: string = 'document.pdf') {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id ${elementId} not found`);
        return;
    }

    try {
        const canvas = await html2canvas(element, {
            scale: 2, // Higher resolution
            useCORS: true, // Handle cross-origin images (like avatars)
            backgroundColor: '#0f172a', // Match dark theme background (slate-950) or use element's
            logging: false
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [canvas.width, canvas.height] // Custom size to fit content exactly
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(fileName);
    } catch (error) {
        console.error('Failed to export PDF:', error);
    }
}
