const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass') (require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer'); 

// Declarar tarea
function css (done) {
    //compilar sass con gulp (pipes)
    //paso 1: identificar archivos 2: compilarla 3: guardarla
    
    src('src/scss/app.scss')
        .pipe( sass({ outputStyle: 'expanded' }) )  //minificar o expandir
        .pipe( postcss([ autoprefixer() ]))         //para dar soporte a otros navegadores
        .pipe( dest('build/css') ) 

    done(); 
    
}

//controlador autoguardado
function dev(){
    watch('src/scss/**/*.scss', css);          //permite compilar todos los archivos con terminacion scss
}

function tareaDefault(){
    console.log('soy una tarea default');   
}

//Permitir mandar a llamar tarea
exports.css = css; 
exports.dev = dev; 
exports.default = series(css, dev); 

//series - Se inicia una tarea y hasta que finaliza se inicia otra
//parallel - Todas inician al mismo tiempo