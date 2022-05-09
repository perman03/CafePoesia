const { src, dest, watch, series, parallel } = require('gulp');
//Dependencias para CSS
const sass = require('gulp-sass') (require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer'); 
const cssnano = require('cssnano'); 
//Dependencias para minificar imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp'); 
const avif = require('gulp-avif');

// Sourcemap
const sourcemaps = require('gulp-sourcemaps'); 

// Declarar tarea
function css (done) {
    //compilar sass con gulp (pipes)
    //paso 1: identificar archivos 2: compilarla 3: guardarla
    
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe( sass({ outputStyle: 'expanded' }) )  //minificar o expandir
        .pipe( postcss([ autoprefixer(), cssnano() ]))         //para dar soporte a otros navegadores
        .pipe(sourcemaps.write('.'))
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

//tarea para convertir imagenes a .WEBP
function versionWebp(done){
    
    src('src/img/**/*.{png,jpg}')                                 //extensiones sin espacio
        .pipe( webp() )
        .pipe(dest ('./build/img'))
    
    done(); 
}

//tarea para convertir imagenes a .AVIF
function versionAvif(done){
    
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png,jpg}')                                 //extensiones sin espacio
        .pipe( avif(opciones) )
        .pipe(dest ('./build/img'))
    
    done(); 
}

//tarea controlador autoguardado
function dev(done) {
    watch( 'src/scss/**/*.scss', css );
    watch( 'src/img/**/*', imagenes );

    done(); 
}


exports.css = css;
exports.dev = dev; 
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);

// series - Se inicia una tarea, y hasta que finaliza, inicia la siguiente
// parallel - Todas inician al mismo tiempo