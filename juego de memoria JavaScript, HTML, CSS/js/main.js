//inicializacion de variables
let tarjetasdestapadas = 0;
let targeta1 = null;
let targeta2 = null;
let primerresultado = null;
let segundoresultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let timerinicial = 60;
let tiemporegresivoid = null;


//apuntado a documentos HTML
let mostrarmovimientos = document.getElementById('movimientos');
let mostraraciertos = document.getElementById('aciertos');
let mostrartiempo = document.getElementById('t-restante');

//generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});

//funciones
function contartiempo(){
    tiemporegresivoid = setInterval(()=>{
        timer--;
        mostrartiempo.innerHTML = `tiempo: ${timer} seg`;
        if(timer == 0){
            clearInterval(tiemporegresivoid);
            bloqueartarjetas();
        }
    },1000);
}

function bloqueartarjetas(){
    for (let i = 0; i<=15; i++){
        let targetabloqueada = document.getElementById(i);
        targetabloqueada.innerHTML = numeros[i];
        targetabloqueada.disabled = true;
    }
}

//funcion principal
function destapar(id){

if(temporizador == false){
    contartiempo();
    temporizador = true;
}

    tarjetasdestapadas++;
    if(tarjetasdestapadas ==1){
        //mostrar primer numero
        targeta1 = document.getElementById(id);
        primerresultado = numeros[id]
        targeta1.innerHTML = primerresultado;

        //deshabilitar primer botton
        targeta1.disabled = true;
    }else if (tarjetasdestapadas ==2){
        //mostrar segundo numero
        targeta2 = document.getElementById(id);
        segundoresultado = numeros[id];
        targeta2.innerHTML = segundoresultado;

        //deshabilitar segundo botton
        targeta2.disabled = true;

        //incremento de movimientos
        movimientos++;
        mostrarmovimientos.innerHTML = `movimientos: ${movimientos}`;

        if(primerresultado == segundoresultado){
            //encerar contador targetas destapadas
            tarjetasdestapadas = 0;

            //aumentar aciertos
            aciertos++;
            mostraraciertos.innerHTML = `aciertos: ${aciertos}`;

            if(aciertos == 8){
                clearInterval(tiemporegresivoid);
                mostraraciertos.innerHTML = `aciertos: ${aciertos} GOOD JOD!!`
                mostrartiempo.innerHTML = `fantastico demoraste ${timerinicial - timer} seg`
                mostrarmovimientos.innerHTML = `movimientos: ${movimientos} EXCELENT XD !!`
            }

        }else{
            //mostrar momentaneamente valores y volver a tapar
            setTimeout(() =>{
                targeta1.innerHTML = ' ';
                targeta2.innerHTML = ' ';
                targeta1.disabled = false;
                targeta2.disabled = false;
                tarjetasdestapadas = 0;
            },800);
        }
    }
}