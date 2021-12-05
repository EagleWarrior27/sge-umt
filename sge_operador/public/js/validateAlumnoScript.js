window.addEventListener('load', function(){
  let alumnoForm = document.querySelector('#alumnoForm');

  alumnoForm.addEventListener('submit', function(e){
    e.preventDefault();
    let errores = [];

    let matricula = document.querySelector('#matricula'); 
    let matriculaErrorMsg = document.querySelector('#matriculaErrorMsg');
    if(matricula.value == '') {
      matricula.classList.remove('is-valid');
      matricula.classList.add('is-invalid');
      matriculaErrorMsg.innerText = 'El campo matrícula no debe estar vacío';
      errores.push('El campo matrícula no debe estar vacío');
    } else if(matricula.value.length < 8) {
      matricula.classList.remove('is-valid');
      matricula.classList.add('is-invalid');
      matriculaErrorMsg.innerText = 'El campo matrícula debe tener al menos 8 caracteres';       
      errores.push('El campo matrícula debe tener al menos 2 caracteres');
    } else {
      matricula.classList.remove('is-invalid');
      matricula.classList.add('is-valid');
      matriculaErrorMsg.innerText = '';
    }

    let nombre = document.querySelector('#nombre'); 
    let nombreErrorMsg = document.querySelector('#nombreErrorMsg');
    if(nombre.value == '') {
      nombre.classList.remove('is-valid');
      nombre.classList.add('is-invalid');
      nombreErrorMsg.innerText = 'El campo nombre no debe estar vacío';
      errores.push('El campo nombre no debe estar vacío');
    } else {
      nombre.classList.remove('is-invalid');
      nombre.classList.add('is-valid');
      nombreErrorMsg.innerText = '';
    }

    let procedencia = document.querySelector('#procedencia'); 
    let procedenciaErrorMsg = document.querySelector('#procedenciaErrorMsg');
    if(procedencia.value == '') {
      procedencia.classList.remove('is-valid');
      procedencia.classList.add('is-invalid');
      procedenciaErrorMsg.innerText = 'El campo procedencia no debe estar vacío';
      errores.push('El campo procedencia no debe estar vacío');
    } else {
      procedencia.classList.remove('is-invalid');
      procedencia.classList.add('is-valid');
      procedenciaErrorMsg.innerText = '';
    }

    if(!errores.length > 0) {
      alumnoForm.submit();
      matriculaErrorMsg.innerText = '';
      nombreErrorMsg.innerText = '';
      procedenciaErrorMsg.innerText = '';
    }
  })
})