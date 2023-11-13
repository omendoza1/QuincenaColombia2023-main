// Deshabilitar el botón limpiar al cargar la página
document.getElementById("btn-limpiar").disabled = true;
document.getElementById("btn-calcular").disabled = true;

// Función para calcular el sueldo final
function calcularSueldo() {
  // Obtener los valores de los campos del formulario
  const sueldoBase = 1160000; // Salario mínimo
  const subsidioTransporte = 140606; // Auxilio de transporte actualizado
  const deduccionSalud = 46400; // 4% del salario mínimo
  const deduccionPension = 46400; // 4% del salario mínimo
  const horasExtraDiurnasOrdinarias = document.getElementById("horas-extra-diurnas-ordinarias").value;
  const horasExtraNocturnasOrdinarias = document.getElementById("horas-extra-nocturnas-ordinarias").value;
  const horasRecargoNocturnoOrdinario = document.getElementById("horas-recargo-nocturno-ordinario").value;
  const horasExtraDiurnasFestivas = document.getElementById("horas-extra-diurnas-festivas").value;
  const horasExtraNocturnasFestivas = document.getElementById("horas-extra-nocturnas-festivas").value;
  const horasRecargoNocturnoFestivo = document.getElementById("horas-recargo-nocturno-festivo").value;
  const diasFestivosTrabajados = document.getElementById("dias-festivos-trabajados").value;

  // Valores hora ordinaria y recargos (estos valores deben ser revisados y ajustados según la empresa)
  const valorHoraOrdinaria = 4833; // Basado en el salario mínimo
  const recargoHoraExtraDiurna = 1.25; // 25%
  const recargoHoraExtraNocturna = 1.75; // 75%
  const recargoHoraExtraDiurnaFestiva = 2.00; // 100%
  const recargoHoraExtraNocturnaFestiva = 2.50; // 150%
  const recargoNocturno = 1.35; // 35% para recargo nocturno ordinario
  const recargoFestivo = 1.75; // 75% para recargo dominical o festivo
  const recargoNocturnoFestivo = 2.10; // 35% nocturno + 75% festivo

  // Calcular el total devengado
  let totalDevengado = sueldoBase/2;
  totalDevengado += valorHoraOrdinaria * recargoHoraExtraDiurna * horasExtraDiurnasOrdinarias;
  totalDevengado += valorHoraOrdinaria * recargoHoraExtraNocturna * horasExtraNocturnasOrdinarias;
  totalDevengado += valorHoraOrdinaria * recargoHoraExtraDiurnaFestiva * horasExtraDiurnasFestivas;
  totalDevengado += valorHoraOrdinaria * recargoHoraExtraNocturnaFestiva * horasExtraNocturnasFestivas;
  totalDevengado += valorHoraOrdinaria * recargoNocturno * horasRecargoNocturnoOrdinario;
  totalDevengado += valorHoraOrdinaria * recargoFestivo * diasFestivosTrabajados;
  totalDevengado += valorHoraOrdinaria * recargoNocturnoFestivo * horasRecargoNocturnoFestivo;
  // Calcular el sueldo final
  const sueldo = totalDevengado - deduccionSalud - deduccionPension + subsidioTransporte;

  // Mostrar el resultado
  document.getElementById("resultado").innerHTML = `El sueldo final a recibir es: $${sueldo.toLocaleString()}`;
}

// Deshabilitar el botón calcular si hay algún campo vacío
function validarFormulario() {
  const campos = document.querySelectorAll("#formulario-liquidacion .form-control");
  let formularioValido = true;
  for (let i = 0; i < campos.length; i++) {
    if (campos[i].value === "") {
      formularioValido = false;
      break;
    }
  }
  document.getElementById("btn-calcular").disabled = !formularioValido;
}

// Limpiar el formulario y habilitar los campos
function limpiarFormulario() {

  const campos = document.querySelectorAll("#formulario-liquidacion .form-control");
  for (let i = 0; i < campos.length; i++) {
    campos[i].value = "0";
    campos[i].disabled = false;
  }
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("btn-limpiar").disabled = true;
  document.getElementById("btn-calcular").disabled = true;
}

// Eventos al cargar la página
window.addEventListener("load", () => {
  // Deshabilitar el spin de los campos de tipo number
  const campos = document.querySelectorAll("#formulario-liquidacion .form-control[type=number]");
  for (let i = 0; i < campos.length; i++) {
    campos[i].addEventListener("input", e => {
      e.target.value = parseInt(e.target.value) || "";
    });
  }

  // Validar el formulario al cambiar el valor de algún campo
  const formulario = document.getElementById("formulario-liquidacion");
  formulario.addEventListener("input", validarFormulario);

  // Calcular el sueldo al hacer clic en el botón calcular
  const btnCalcular = document.getElementById("btn-calcular");
  btnCalcular.addEventListener("click", () => {
    calcularSueldo();
    btnCalcular.disabled = true;
    document.getElementById("btn-limpiar").disabled = false;
    formulario.querySelectorAll(".form-control").forEach(campo => {
      campo.disabled = true;
    });
  });

  // Limpiar el formulario al hacer clic en el botón limpiar
  const btnLimpiar = document.getElementById("btn-limpiar");
  btnLimpiar.addEventListener("click", limpiarFormulario);
});
const formulario = document.getElementById('formulario-liquidacion');
const botonEnviar = formulario.querySelector('.btn-primary');

botonEnviar.addEventListener('click', () => {
  formulario.classList.add('active');
});
const inputs = document.querySelectorAll(".form-control");
inputs.forEach(input => {
  let noBorrar = false;
  let haDigitado = false;

  input.addEventListener("focus", function() {
    if (this.value === "0") {
      noBorrar = true;
      }
      });
      
      input.addEventListener("keydown", function(event) {
        if (event.key !== "Tab" && (event.key < "0" || event.key > "9") && event.key !== "Backspace") {
          event.preventDefault();
          this.classList.add("temblor");
          alert("Ingrese un número");
        }
      
      if (event.key === "Backspace" && noBorrar) {
        event.preventDefault();
        if (!haDigitado) {
          
          this.classList.add("temblor");
        }
      }
      
      if (this.value > "0") {
      noBorrar = false;
      haDigitado = true;
      }
      });
      
      input.addEventListener("keyup", function() {
      if (this.value === "") {
      this.value = "0";
      }
      });
      
      input.addEventListener("input", function() {
        const maxlength = this.getAttribute("data-maxlength");
        if (this.value.length > maxlength) {
          this.value = this.value.slice(0, maxlength);
        }
        if (this.value.length === maxlength) {
          const nextInput = this.nextElementSibling;
          if (nextInput) {
            nextInput.focus();
          }
        }
      });
      
      input.addEventListener("animationend", function() {
      this.classList.remove("temblor");
      });
      });

    

      