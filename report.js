// Тимчасово — тестові дані для обчислення
const mockPatients = [
    { height: 170, weight: 65, bmi: 22.5 },
    { height: 180, weight: 78, bmi: 24.1 },
    { height: 160, weight: 60, bmi: 23.4 }
];

const form = document.getElementById('agg-form');
const successBlock = document.getElementById('agg-success');
const resultText = document.getElementById('result-value');
const downloadBtn = document.getElementById('download-agg-pdf');

let currentMetric = "";
let currentAvg = 0;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const metric = form.elements.metric.value;

    if (!metric) {
        alert("Оберіть показник");
        return;
    }

    currentMetric = metric;

    // Обчислення середнього значення
    const values = mockPatients.map(p => p[metric]).filter(Boolean);
    const sum = values.reduce((acc, val) => acc + val, 0);
    const avg = (sum / values.length).toFixed(2);

    currentAvg = avg;
    resultText.textContent = avg;
    successBlock.style.display = 'block';
});

// Генерація PDF
downloadBtn.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("Times");
    doc.setFontSize(16);
    doc.text("Агрегований звіт", 20, 20);

    const labelMap = {
        height: "Зріст (см)",
        weight: "Вага (кг)",
        bmi: "Індекс маси тіла (ІМТ)"
    };

    doc.setFontSize(12);
    doc.text(`Показник: ${labelMap[currentMetric]}`, 20, 40);
    doc.text(`Середнє значення: ${currentAvg}`, 20, 50);
    doc.text(`Дата звіту: ${new Date().toLocaleString()}`, 20, 65);

    doc.save(`aggregated_report_${currentMetric}.pdf`);
});
