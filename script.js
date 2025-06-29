// Отримуємо форму та секцію з кнопкою PDF
const form = document.getElementById('patient-form');
const successSection = document.getElementById('success-section');
const generatePdfBtn = document.getElementById('generate-pdf');

// Обробка форми
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    // Отримуємо дані
    const firstName = formData.get('firstName').trim();
    const lastName = formData.get('lastName').trim();
    const birthDate = formData.get('birthDate');
    const gender = formData.get('gender');
    const phone = formData.get('phone').trim();
    const height = parseFloat(formData.get('height'));
    const weight = parseFloat(formData.get('weight'));
    const note = formData.get('note').trim();

    // Валідація
    if (new Date(birthDate) > new Date()) {
        alert('Дата народження не може бути у майбутньому.');
        return;
    }

    if (height <= 0 || weight <= 0) {
        alert('Зріст і вага мають бути додатніми числами.');
        return;
    }

    // Розрахунок ІМТ
    const heightMeters = height / 100;
    const bmi = (weight / (heightMeters ** 2)).toFixed(2);

    // Підготовка даних
    const patientData = {
        firstName,
        lastName,
        birthDate,
        gender,
        phone,
        height,
        weight,
        bmi,
        note,
        submittedAt: new Date().toISOString()
    };

    console.log('Пацієнт збережений:', patientData);

    // Поки що: просто показуємо секцію
    successSection.style.display = 'block';

    // Збережемо дані для генерації PDF
    localStorage.setItem('lastPatient', JSON.stringify(patientData));
});

// Обробка кнопки "Отримати звіт"
generatePdfBtn.addEventListener('click', function () {
    const savedData = localStorage.getItem('lastPatient');
    if (!savedData) {
        alert('Немає даних для звіту.');
        return;
    }

    const patient = JSON.parse(savedData);

    // Імпортуємо функцію генерації PDF
    import('./utils/pdf-generator.js').then(({ generatePatientPDF }) => {
        generatePatientPDF(patient);
    });
});
