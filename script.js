const API_KEY = 'c7e1c340a3881254aa02c6a4425c2046';
const KELVIN = 273.15;

function fetchDatosClima() {
    const inputCity = document.getElementById('ciudadEntrada').value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => mostrarDatosClima(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            Toastify({
                text: 'Error al obtener datos meteorológicos. Por favor, inténtelo de nuevo más tarde.',
                className: 'danger',
                style: {
                    background: 'linear-gradient(to right, #bb163a, #ff760d)',
                },
            }).showToast();
        });
}

document.getElementById('botonBusqueda').addEventListener('click', () => {
    const ciudad = document.getElementById('ciudadEntrada').value;
    if (ciudad) {
        fetchDatosClima();
    } else {
        Toastify({
            text: 'Ingrese una ciudad',
            className: 'danger',
            style: {
                background: 'linear-gradient(to right, #bb163a, #ff760d)',
            },
        }).showToast();
    }
});

function mostrarDatosClima(data) {
    if (data?.cod == 404) {
        Toastify({
            text: 'No se encontró la ciudad, ingrese nuevamente una ciudad correcta',
            className: 'danger',
            style: {
                background: 'linear-gradient(to right, #bb163a, #ff760d)',
            },
        }).showToast();
        return;
    }

    const divdatosClima = document.getElementById('datosClima');
    divdatosClima.innerHTML = '';

    const ciudadNombre = data.name;
    const temperatura = data.main?.temp;
    const descripcion = data.weather[0]?.description;
    const icon = data.weather[0]?.icon;

    if (ciudadNombre && temperatura !== undefined && descripcion) {
        const ciudadTitulo = document.createElement('h2');
        ciudadTitulo.textContent = ciudadNombre;

        const temperaturaInfo = document.createElement('p');
        temperaturaInfo.textContent = `La temperatura es: ${Math.floor(temperatura - KELVIN)}°C`;

        const descripcionInfo = document.createElement('p');
        descripcionInfo.textContent = `La descripción meteorológica es: ${descripcion}`;

        const icono = document.createElement('img');
        icono.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        divdatosClima.appendChild(ciudadTitulo);
        divdatosClima.appendChild(temperaturaInfo);
        divdatosClima.appendChild(descripcionInfo);
        divdatosClima.appendChild(icono);
    } else {
        console.error('Datos meteorológicos incompletos:', data);
        Toastify({
            text: 'Error al procesar los datos meteorológicos. Por favor, inténtelo de nuevo más tarde.',
            className: 'danger',
            style: {
                background: 'linear-gradient(to right, #bb163a, #ff760d)',
            },
        }).showToast();
    }
}
