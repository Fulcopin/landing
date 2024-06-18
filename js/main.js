document.getElementById('filter').addEventListener('input', handleFilterInput);

function handleFilterInput() {
    var inputField = document.getElementById('filter');
    var message = document.getElementById('inputMessage');
    if (inputField.value.trim() === '') {
        message.style.display = 'block';
    } else {
        message.style.display = 'none';
    }
}

function validateForm() {
    let formName = document.getElementById('form_name');
    let formEmail = document.getElementById('form_email');
    let formSubject = document.getElementById('form_subject');
    let formMessage = document.getElementById('form_message');
    let combo1 = document.getElementById('combo1');
    let combo2 = document.getElementById('combo2');

    if (formName.value.trim() === '') {
        formName.focus();
        alert('Nombre requerido');
        return false;
    }
    if (formEmail.value.trim() === '' || !isValidEmail(formEmail.value)) {
        formEmail.focus();
        alert('Correo electrónico requerido');
        return false;
    }
    if (formSubject.value.trim() === '') {
        formSubject.focus();
        alert('Asunto requerido');
        return false;
    }
    if (formMessage.value.trim() === '') {
        formMessage.focus();
        alert('Mensaje requerido');
        return false;
    }
    if (combo1.value.trim() === '') {
        combo1.focus();
        alert('Primera opción requerida');
        return false;
    }
    if (combo2.value.trim() === '') {
        combo2.focus();
        alert('Segunda opción requerida');
        return false;
    }
    return true;
}

function submitForm(eventSubmit) {
    eventSubmit.preventDefault();

    if (!validateForm()) {
        return;
    }

    let formData = {
        name: document.getElementById('form_name').value,
        email: document.getElementById('form_email').value,
        subject: document.getElementById('form_subject').value,
        message: document.getElementById('form_message').value,
        Sexo: document.getElementById('combo1').value,
        Producto: document.getElementById('combo2').value
    };

    let firebaseUrl = 'https://quantum-vigil-366716-default-rtdb.firebaseio.com/collection.json';

    fetch(firebaseUrl, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Datos enviados correctamente. Enviamos la informacion al correo con su contraseña');
        document.getElementById('contact-form').reset();
        fetchAndDisplayData(); 
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Hubo un error al enviar los datos');
    });
}

function loaded(eventLoaded) {
    window.alert("Loaded");
    console.log(eventLoaded);

    let myform = document.getElementById('contact-form');
    if (myform) {
        myform.addEventListener('submit', submitForm);
    } else {
        console.error('El formulario con id "contact-form" no se encontró en el DOM');
    }
    fetchAndDisplayData();
}

window.addEventListener("DOMContentLoaded", loaded);

async function fetchAndDisplayData() {
    const response = await fetch('https://quantum-vigil-366716-default-rtdb.firebaseio.com/collection.json');
    const data = await response.json();

    const tableBody = document.getElementById('tablebodys');
    tableBody.innerHTML = '';

    const subcriptionCount = {};
    let totalSupcripcion = 0;
    for (const key in data) {
        const entry = data[key];
        const subject = entry.subject;
        const gender = entry.Sexo;
        const product = entry.Producto;
        const keyString = `${subject}-${gender}-${product}`;

        if (subcriptionCount[keyString]) {
            subcriptionCount[keyString]++;
        } else {
            subcriptionCount[keyString] = 1;
        }
    }

    for (const key in subcriptionCount) {
        const [subject, gender, product] = key.split('-');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${subject}</td>
            <td>${gender}</td>
            <td>${product}</td>
            <td>${subcriptionCount[key]}</td>
        `;
        tableBody.appendChild(row);
        totalSupcripcion += subcriptionCount[key];
    }

    document.getElementById('supcripcion').textContent = totalSupcripcion;
}

function filterTable() {
    const filterValue = document.getElementById('filter').value.toLowerCase();
    const rows = document.querySelectorAll('#tablebodys tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        let match = false;

        cells.forEach(cell => {
            if (cell.textContent.toLowerCase().includes(filterValue)) {
                match = true;
            }
        });

        if (match) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

document.getElementById('filter').addEventListener('input', filterTable);

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
