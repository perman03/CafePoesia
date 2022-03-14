// Declarar tarea
function tarea(done) {
    console.log('Desde mi primer tarea');
    done(); 
}

//Permitir mandar a llamar tarea
exports.tarea = tarea; 