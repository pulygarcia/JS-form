document.addEventListener('DOMContentLoaded', function(e){
    //ubico los campos y botones
    const formularioContainer = document.querySelector('#formulario-container');
    const formulario = document.querySelector('#formulario');
    const inputNombre = document.querySelector('#nombre');
    const inputApellido = document.querySelector('#apellido');
    const inputEmail = document.querySelector('#email');
    const submit = document.querySelector('#submit');
    const reset = document.querySelector('#reset');
    const spinner = document.querySelector('.spinner');

    //objeto para almacenar los inputs
    const campos = {
        nombre: '',
        apellido: '',
        email: ''
    }

    //creo eventos
    inputNombre.addEventListener('input', validarCampo);
    inputApellido.addEventListener('input', validarCampo);
    inputEmail.addEventListener('input', validarCampo);
    reset.addEventListener('click', resetear);
    submit.addEventListener('click', enviar);

    //funciones
    function validarCampo(e) {
        const input = e.target.id;
        const contenedor = e.target.parentElement;
        
        if(e.target.value.trim() === ''){
            mostrarAlerta(`El campo ${input} está vacío`, contenedor);
            campos[input] = '';
            comprobarCampos();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido', contenedor);
            comprobarCampos();
            return;
        }


        limpiarAlerta(contenedor); //comprueba si ya existe la alerta en el campo
        campos[input] = e.target.value.trim(); //asignar lo escrito en cada input al objeto campos
        comprobarCampos();
    }
    
    function mostrarAlerta(mensaje, ubicacion) {
        limpiarAlerta(ubicacion);

        const alerta = document.createElement('p');
        alerta.textContent = mensaje;
        alerta.classList.add('alerta');

        ubicacion.appendChild(alerta);
    }

    function limpiarAlerta(ubicacion) {
        const notificacion = ubicacion.querySelector('.alerta');

        if(notificacion){
            notificacion.remove();
        }
    }

    function validarEmail(email) {
        const expresion =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
        const resultado = expresion.test(email);

        return resultado; //booleano
    }

    function comprobarCampos() {
        if(!Object.values(campos).includes('')){
            submit.classList.remove('opacity-50');
            submit.disabled = false;
            return;
        }
        
        submit.classList.add('opacity-50');
        submit.disabled = true;
    }

    function resetear() {

        campos.nombre = '';
        campos.apellido = '';
        campos.email = '';
        
        limpiarAlerta(formularioContainer);
        comprobarCampos();
    }

    function enviar(e) {
        e.preventDefault();

        comprobarCampos();

        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.add('hidden');
            enviado();
        }, 4000);
    }

    function enviado() {
        const enviado = document.querySelector('.enviado');
        if(enviado){
            enviado.remove();
        }

        const mensaje = document.createElement('p');
        mensaje.classList.add('enviado');
        mensaje.textContent = '¡Enviado correctamente!';
        
        formularioContainer.appendChild(mensaje);

        setTimeout(() => {
            formularioContainer.removeChild(mensaje);
        }, 3000);
    }
})