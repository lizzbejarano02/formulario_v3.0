document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const telInput = document.getElementById('telefono');
    const fechaInput = document.getElementById('fechaNacimiento');

    // --- 1. BLOQUEAR FECHAS FUTURAS EN CALENDARIO ---
    const establecerFechaMaxima = () => {
        const hoy = new Date();
        const yyyy = hoy.getFullYear();
        let mm = hoy.getMonth() + 1; 
        let dd = hoy.getDate();

        if (mm < 10) mm = '0' + mm;
        if (dd < 10) dd = '0' + dd;

        const maxDate = `${yyyy}-${mm}-${dd}`;
        fechaInput.setAttribute("max", maxDate); 
    };
    establecerFechaMaxima();

    // --- 2. MASCARA CELULAR (10 DIGITOS) ---
    telInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '').slice(0, 10);
        let formatted = val;
        
        if (val.length > 3 && val.length <= 6) {
            formatted = `${val.slice(0, 3)} ${val.slice(3)}`;
        } else if (val.length > 6) {
            formatted = `${val.slice(0, 3)} ${val.slice(3, 6)} ${val.slice(6)}`;
        }
        e.target.value = formatted;
    });

    // --- 3. VALIDACION FINAL ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const fechaSeleccionada = fechaInput.value;
        const celLimpio = telInput.value.replace(/\D/g, '');
        const intereses = document.querySelectorAll('input[name="interes"]:checked');

        let errores = [];

        if (!fechaSeleccionada) {
            errores.push("Por favor, seleccione su fecha de nacimiento.");
        } else {
            const fDate = new Date(fechaSeleccionada);
            const hoy = new Date();
            if (fDate > hoy) {
                errores.push("La fecha no puede ser mayor al dia de hoy.");
            }
        }

        if (celLimpio.length !== 10) {
            errores.push("El numero de celular debe tener exactamente 10 digitos.");
        }

        if (intereses.length === 0) {
            errores.push("Debe elegir al menos un interes.");
        }

        if (errores.length > 0) {
            alert("Errores encontrados:\n\n- " + errores.join("\n- "));
        } else {
            alert("Registro exitoso. Bienvenido!");
            console.log("Datos validados correctamente.");
        }
    });
});
