const formulario = document.getElementById('formulario');
/*creo una array con todos los inputs, es bueno para cuando validemos mas campos*/
const inputs = document.querySelectorAll('#formulario input');

//objeto que puede contener varias expresiones, para varias validaciones
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    cedula: /^\d{6,7}$/,// 6 a 7 digitos
    telefono: /^09[6-9][1-6]\d{6}$/
}

const campos = {
    nombre : false,
    apellido : false,
    cedula: false,
    telefono: false
}

const validarFormulario = (e) => {
    switch(e.target.name){
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, 'apellido');
        break;
        case "cedula":
            validarCampo(expresiones.cedula, e.target, 'cedula');
        break;
        case "telefono":
            validarCampo(expresiones.cedula, e.target, 'telefono');
        break;
    }
};
const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    }else{
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
    }
}
/* Por cada input ejecuta una función */
inputs.forEach((input) => {
    //por cada input agregar un event listener
    //keyup ejecuta un codigo cuando dejamos de presionar una tecla 
    input.addEventListener('keyup', validarFormulario);
    //blur se ejecuta cuando se clickea fuera de los campos
    input.addEventListener('blur', validarFormulario );
});
//e = evento
formulario.addEventListener('submit', (e) =>{
    e.preventDefault();//evita que se realize el evento
    if(campos.nombre && campos.apellido && campos.cedula && campos.telefono){
        //si los compos obligatorios son correctos, reinicio mi formulario
        formulario.reset();
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        },5000);
        //remover los iconos
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
    }else{
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});w