document.getElementById('filterInput').addEventListener('input', handleFilterInput);

function handleFilterInput() {
    var inputField = document.getElementById('filterInput');
    var message = document.getElementById('inputMessage');
    if (inputField.value.trim() === '') {
        message.style.display = 'block';
    } else {
        message.style.display = 'none';
    }
}

function validateForm() {
    let formEmail = document.getElementById('emailAddress');
    let formPassword = document.getElementById('password');
    let formCity = document.getElementById('city');
    let formProductType = document.getElementById('productType');
    let formDesignStyle = document.getElementById('designStyle');
    let formGender = document.getElementById('gender');
    let formDetails = document.getElementById('details');

    if (formEmail.value.trim() === ''|| !isValidEmail(formEmailValue)) {
        formEmail.focus();
        alert('Correo electrónico requerido');
        return false;
    }
    if (formPassword.value.trim() === '') {
        formPassword.focus();
        alert('Contraseña requerida');
        return false;
    }
    if (formCity.value.trim() === '') {
        formCity.focus();
        alert('Ciudad requerida');
        return false;
    }
    if (formProductType.value.trim() === '') {
        formProductType.focus();
        alert('Tipo de producto requerido');
        return false;
    }
    if (formDesignStyle.value.trim() === '') {
        formDesignStyle.focus();
        alert('Estilo de diseño requerido');
        return false;
    }
    if (formGender.value.trim() === '') {
        formGender.focus();
        alert('Sexo requerido');
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
        email: document.getElementById('emailAddress').value,
        password: document.getElementById('password').value,
        city: document.getElementById('city').value,
        productType: document.getElementById('productType').value,
        designStyle: document.getElementById('designStyle').value,
        gender: document.getElementById('gender').value,
        details: document.getElementById('details').value
    };

    let firebaseUrl = 'https://proyect-424c0-default-rtdb.firebaseio.com/basic.json';

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
        alert('Solicitud de Reserva enviada con exito');
        document.getElementById('pedido-form').reset();
        fetchAndDisplayData(); 
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Hubo un error al enviar los datos');
    });
}

function loaded(eventLoaded) {
    window.alert("Landing page loaded");
    console.log(eventLoaded);

    let myform = document.getElementById('pedido-form');
    if (myform) {
        myform.addEventListener('submit', submitForm);
    } else {
        console.error('El formulario con id "pedido-form" no se encontró en el DOM');
    }
    fetchAndDisplayData();
}

window.addEventListener("DOMContentLoaded", loaded);

async function fetchAndDisplayData() {
    const response = await fetch('https://proyect-424c0-default-rtdb.firebaseio.com/basic.json');
    const data = await response.json();

   
    const tableBody = document.getElementById('tablebody');
    tableBody.innerHTML = ''; 

    const reservationCount = {};
    let totalReservas = 0;
    for (const key in data) {
        const entry = data[key];
        const city = entry.city;
        const product = entry.productType;
        const gender = entry.gender;
        const style = entry.designStyle;
        const keyString = `${city}-${product}-${gender}-${style}`;

        if (reservationCount[keyString]) {
            reservationCount[keyString]++;
        } else {
            reservationCount[keyString] = 1;
        }
    }

    for (const key in reservationCount) {
        const [city, product, gender, style] = key.split('-');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${city}</td>
            <td>${product}</td>
            <td>${style}</td>
            <td>${gender}</td>
            <td>${reservationCount[key]}</td>
        `;
        tableBody.appendChild(row);
        totalReservas += reservationCount[key];
    }

    
    document.getElementById('Reservas').textContent = totalReservas;
}

function filterTable() {
    const filterValue = document.getElementById('filterInput').value.toLowerCase();
    const rows = document.querySelectorAll('#tablebody tr');

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

document.getElementById('filterInput').addEventListener('input', filterTable);
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
