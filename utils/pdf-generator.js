export function generatePatientPDF(patient) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text('Звіт про пацієнта', 20, 20);

    const lines = [
        `Ім’я: ${patient.firstName}`,
        `Прізвище: ${patient.lastName}`,
        `Дата народження: ${patient.birthDate}`,
        `Стать: ${patient.gender}`,
        `Телефон: ${patient.phone || '-'}`,
        `Зріст: ${patient.height} см`,
        `Вага: ${patient.weight} кг`,
        `ІМТ: ${patient.bmi}`,
        `Коментар: ${patient.note || '-'}`,
        `Дата реєстрації: ${new Date().toLocaleString()}`
    ];

    lines.forEach((line, index) => {
        doc.text(line, 20, 35 + index * 10);
    });

    doc.save(`${patient.lastName}_${patient.firstName}_звіт.pdf`);
}
