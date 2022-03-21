const { src, dest, watch, series, parallel } = require('gulp');
//Dependencias para CSS
const sass = require('gulp-sass') (require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer'); 
//Dependencias para minificar imagenes
const imagemin = require('gulp-imagemin');

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

//tarea para pasar las imagenes al build
function imagenes(done){


    src('src/img/**/*')                                           //asterisco = todos los archivos y sus extension
        .pipe( imagemin({optimizationLevel: 3}))                  //tuberia para minificar imagenes
        .pipe( dest('build/img') )

    
    done(); 
}

//tarea controlador autoguardado
function dev(){
    watch('src/scss/**/*.scss', css);          //permite compilar todos los archivos con terminacion scss
    watch('src/img/**/*', imagenes); 
}

function tareaDefault(){
    console.log('soy una tarea default');   
}


//Permitir llamado de tarea
exports.css = css; 
exports.dev = dev; 
exports.default = series(imagenes, css, dev);
exports.imagenes = imagenes; 

//series - Se inicia una tarea y hasta que finaliza se inicia otra
//parallel - Todas inician al mismo tiempo