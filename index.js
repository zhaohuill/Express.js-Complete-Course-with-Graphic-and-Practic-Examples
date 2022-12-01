/**+-(0)-Código de Creación de Un Servidor Básico con Node.js para tener de Ejemplo y Comparar Ambos:_.*/
// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.status = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
// });

// server.listen(3000, () => {
//     console.log('Server on port 3000');
// });

/**+-(1)-IMPORTAR EXPRESS.JS:_ Para crear un Servidor con Express.js lo 1ro que tenemos que hacer es Importar Express con el Código "const express = require('express');" de la misma forma que en Node.js 
 *  Importamos HTTP con "const http = require('http');".NOTA:_ El Módulo por el cual Importamos Express.js Internamente utiliza el Módulo HTTP. Y después para empezar a usarlo lo Invocamos debajo con la 
 *  Sintaxis "const app = express();".*/

const express = require('express');
const morgan = require('morgan');
const app = express();


/**+-(10)-SETTINGS:_ El Método "app.set(***);" sirve para Configurar distintas Atributos de Nuestra Aplicación: Funciona con 2 Parámetros siendo el 1ro El Nombre del Atributo y como 2do el Valor del Atributo.
 * +-Para Una App con un Atributo "appName = 'Ignacio.C Express.js Course'" escribiríamos lo Siguiente:_.*/

app.set('appName', 'Ignacio.C Express.js Course');
/**+-Aprender más en http://expressjs.com/es/api.html#app.set.*/


/**+-(11)-MOTOR DE PLANTILLAS EJS:_ EJS(Embedded JavaScript templates) es un lenguaje de plantillas simple que le permite generar marcado HTML con JavaScript simple. No hay religiosidad sobre cómo organizar las cosas. Sin reinvención de iteración y
 *  control de flujo. Es simplemente JavaScript. Para Instalar y Usar EJS(https://ejs.co/#install) simplemente Escribimos en la Consola de Comandos Ubicada en la Carpeta de Nuestro Proyecto "npm install ejs" y después
 * lo Configuramos escribiendo al Principio del Proyecto pero después de las Const/Let "app.set('view engine', 'ejs');". Para Seguir Aprendiendo ir al Archivo "index.ejs" en la Carpeta "views".*/

app.set('view engine', 'ejs');


/**+-(7)-MIDDLEWARES:_ Un Middleware es una Función que se puede ejecutar antes o después del manejo de una ruta, PERO SE DEBEN DECLARAR Y ESCRIBIR ANTES DE LAS RUTAS. Esta función tiene acceso al objeto Request,
 * Response y la función next().
+-Las funciones Middleware suelen ser utilizadas como mecanismo para verificar niveles de acceso antes de entrar en una ruta, manejo de errores, validación de datos, etc.
+-Funciona de Forma MUY Similar al Método "app.all(***);" con la Diferencia de que éste último Funciona para la Ruta que se le Específica y los MDDLEWARES Funcionan para Todas las Rutas.
+-POR EJEMPLO a Continuación la Siguiente Función de Tipo Middleware "logger()"(Registrador en Inglés) va a Escribir en Consola "Route Received: ***"(La Ruta Solicitada al Servidor) cada vez que nuestro 
    Servidor Reciba una Petición y luego de eso Gracias a su Parámetro "next" que después se Ejecuta como la Función "next();" la Petición continúe hacia la Ruta Correspondiente.*/

const logger = (req, res, next) => {
    console.log(`Route Received: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next(); /**+-Aprende Sobre Los Métodos de Express.js en: https://expressjs.com/es/api.html#req.protocol - https://expressjs.com/es/api.html#req.get - https://expressjs.com/es/api.html#req.originalUrl .*/
};

app.use(express.json()); /**+-Para que Express.js entienda los Datos en Formato JSON.*/
app.use(logger); /**+-PARA PODER USAR LAS FUNCIONES MIDDLEWARES DEBEMOS EJECUTARLAS DESPUÉS DE HABERLAS CREADO USANDO "app.use(*middleware-name*);".*/

/**+-(8)-INSTALAR MIDDLEWARES PREFABRICADOS:_ No siempre tenemos que Crear desde Cero Nuestros Middlewares Nosotros Mismos, ya que en https://www.npmjs.com/package/ podemos Encontrar un Montón de Módulos de
 * Middlewares Prefabricados. POR EJEMPLO, para el Propósito de la Función "logger(***);" que hicimos Anteriormente ya Existe un Módulo de Middleware Prefabricado llamado "morgan"(https://www.npmjs.com/package/morgan) 
 * que se Instala Tecleando en la Consola de Comandos en la Carpeta de Nuestro Proyecto "npm i morgan", luego Importándolo al Principio del Archivo con "const morgan = require('morgan');" y por
 * Último Ejecutándolo escribiendo DESPUÉS de las var, let, cons y func pero ANTES de las Rutas "app.use(morgan('***'));".*/

app.use(morgan('dev')); /**+-Dentro de los Paréntesis de la Función/Método morgan(***); se debe especificar un String con el nombre del Formato Predefinido (Aclarados en https://www.npmjs.com/package/morgan) que
    da la Respuesta por Consola Predefinida que Invoquemos, en este caso Usamos 'dev' que devuelve por Consola el Método HTTP que Utilizamos en la Petición (Ej: GET), la Ruta (Ej: /user), El Nº de la Respuesta HTTP
    que Dió el servidor (Ej: 200), el Tiempo en MiliSegundos que Tardamos en Dar la Respuesta (Ej: 1.049 ms) y la Cantidad de Bytes que Peso la Respuesta (Ej: 43).*/



/**+-(2)-LANZAR UN SERVIDOR CON EXPRESS.JS:_ Ahora para lanzar el Servidor en el Puerto Por Defecto Nº 3000 escribimos una Sintaxis similar pero diferente que en Node.js:_
 * 
 *  (+-La Función de Abajo quiere decir:_ Cuando el Navegador le hace una petición HTTP (".get") al servidor ("server") en su Página Principal ('/') la respuesta será "res.send('Hello World');". A diferencia de
 * con Node.js, ya no tenemos que explicar el Estado ("res.status = 200;") ni el Tipo de Contenido que le vamos a mandar ("res.setHeader('Content-Type', 'text/plain');"), solo mandamos el Texto de Forma Directa.)
 * server.get('/', (req, res) => {
 *      res.send('Hello World');
 * });
 * 
 * server.listen(3000, () => {
 *     console.log('Server on port 3000');
 * });
+-Como se vé, se necesita escribir bastante menos que en Node.js para hacer el mismo procedimiento. Después para Ejecutarlo hacemos igual que en Node.js:_ Abrimos la Consola de Comandos(CMD en Windows) en la 
Carpeta de Nuesto Proyecto y Ejecutamos el Comando "node *file-name*" donde "*file-name*" es el Nombre Completo de Nuestro Archivo.*/

app.get('/hello', (req, res) => {
    res.send('Hello World');
});
/**+-COMO PUDIMOS VER HASTA AHORA, EXPRESS.JS SIRVE PARA RESUMIR NODE.JS UTILIZANDO FUNCIONES/MÉTODOS PARA EVITAR ESCRIBIR MUCHO TEXTO REPETITIVO, LO QUE NOS PERMITE HACER MUCHO CON MUY POCO CÓDIGO.*/

/**+-(3)-ROUTING(ENRUTAMIENTO) CON EXPRESS.JS:_ Como vimos mas arriba con el Método "app.get('/', (req, res) => {***});" donde " '/' " es la Ruta que lleva a la Página Principal, 
 * si queremos hacer una Sección o Subdivisión a parte en Nuestra Página, como Por Ejemplo una división de "ABOUT", debemos volver a Invocar el mismo Método que antes PERO, cambiando la Ruta por " '/about' ".
 * +-Algo así:_ ""app.get('/about', (req, res) => {***});"".*/

app.get('/about', (req, res) => { /**+-Método GET para cuando el Navegador le pide un Dato para Mostrar al Servidor.*/
    res.send('About Me');
});


/**+-(6)-app.all('/route', ***) (https://expressjs.com/es/guide/routing.html):_ Hay un método de direccionamiento especial, app.all(), que no se deriva de ningún método HTTP. Este método se utiliza para cargar 
 * funciones de middleware en una vía de acceso para todos los Métodos de solicitud. 
 * 
 * +-La Sintaxis de "app.all('/route', ***)" se debe Escibir ANTES de las Declaraciones de los Distintos Métodos HTTP hacia esa Ruta. Por Ej:_ Escribir 1ro "app.all('/user', ***)" Y SOLO DESPUÉS ESCRIBIR
 *  "app.get('/user', ***)", "app.post('/user', ***)", "app.delete('/user', ***)", etc.
 * 
 * +-En el siguiente ejemplo, el manejador se ejecutará para las solicitudes a “/user”, tanto si utiliza GET, POST, PUT, DELETE, como cualquier otro método de solicitud HTTP soportado en el módulo http.*/

app.all('/user', (req, res, next) => {
    console.log('Accessing the User Section ...');
    next();
});


/**+-(3)-Y si ahora Guardamos el Archivo y volvemos a Ejecutar el Servidor con "node *file.name*" y en la URL de "localhost:3000" le agregamos "/about" para que quede "localhost:3000/about" nos va a Cargar una
 *  Página con el Texto "About Me" que escribimos anteriormente. De esta forma podemos crear múltiples Rutas en nuestra Web, como a continuación haremos una más de Ejemplo sobre "USER".
 * +-Además, si lo que queremos es Enviar una Colección de datos en Por Ej. un Elemento JSON, en vez de Responder con "res.send(***);" para enviar sólo un pedazo de Texto enviamos un "res.json({***});"
 * con los Datos en Formato JSON dentro:_.*/

app.get('/user', (req, res) => { /**+-Método GET para cuando el Navegador le pide un Dato para Mostrar al Servidor.*/
    res.json({
        username: 'Michael',
        lastname: 'Townley'
    });
});

/**+-(4)-MÉTODOS HTTP(https://developer.mozilla.org/es/docs/Web/HTTP/Methods):_ HTTP define un conjunto de Métodos de Petición para indicar la acción que se desea realizar para un recurso determinado, anteriormente
 * usamos el Método Por Defecto "get" en el que el Navegador le Pide algo para Mostrar al Servidor, pero también hay otros con funciones específicas y se Invocan de la misma Forma que el Método "get" PERO 
 * reemplazando el Nombre de la Función que se le Ejecuta al Servidor creado, así:_ "app.*method-name*('/route', (req, res) => {***});". Se pueden usar Distintos Métodos en una misma ruta PERO NUNCA usar el Mísmo 
 *  Método Repetido en la Misma Ruta.
 * +-A continuación, Ejemplos:_(NOTA:_ PARA HACER MÁS FÁCIL EL USO Y TESTEO DE ESTOS MÉTODOS USAR EL PROGRAMA POSTMAN https://www.postman.com).*/

app.post('/user', (req, res) => { /**+-Método POST para cuando el Navegador le quiere Enviar un Dato al Servidor.*/
    console.log(req.body); /**+-"console.log(req.body);" para ver los Datos que el Usuario Ingresó en el hipotético Formulario y quiere Enviar al Servidor.*/
    res.send('<h1>POST REQUEST RECEIVED</h1>');
});

app.put('/example', (req, res) => { /**+-Método PUT para cuando el Navegador le quiere Actualizar un Dato Modificándolo Completamente al Servidor.*/
    res.send('<h1>PUT REQUEST RECEIVED</h1>');
});

app.patch('/part', (req, res) => { /**+-Método PATCH para cuando el Navegador le quiere Actualizar un Dato Modificándolo Parcialmente al Servidor.*/
    res.send('<h1>PATCH REQUEST RECEIVED</h1>');
});


app.delete('/delete', (req, res) => { /**+-Método DELETE para cuando el Navegador le quiere Borrar un Dato al Servidor.*/
    res.send('<h1>DELETE REQUEST RECEIVED</h1>');
});

/**+-(5)-DYNAMIC ROUTES(RUTAS DINÁMICAS):_ Sirven para que que Usando nuestra Página Web se pudan Crear una Nueva Ruta/Subdivisión en la URL de nuestra Página Web; POR EJEMPLO, en "www.facebook.com" al Crearse
 * un Nuevo Usuario a ese Usuario se le crea una Nueva SubURL específica y quedaría como "www.facebook.com/nombredelusuario/". Para Poder Lograr esto, declaramos con el Método HTTP que corresponda la Ruta Creada
 *  por Nosotros y a continuación le Agregamos la Nueva Ruta Dinámica Variable en Forma de una Barra Diagonal "/", Dos Puntos ":" y el el Nombre del Dato al que esperamos Recibir en esa Ruta, por Ejemplo:_.*/

/**+-"/:username" porque dentro de la SubRuta "/user" creada por Nosotros esperamos recibir una Nueva Ruta Dinámica con el Nombre del Usuario(Username).*/
app.post('/user/:username', (req, res) => { /**+-Método POST para cuando el Navegador le quiere Enviar un Dato al Servidor.*/
    console.log(req.body); /**+-"console.log(req.body);" para ver los Datos que el Usuario Ingresó en el hipotético Formulario y quiere Enviar al Servidor.*/
    console.log(req.params);  /**+-"console.log(req.params);" para ver el Nombre del Hipotético Nuevo Usuario y que aparecería como SubRuta de "/user".*/

    res.send(`POST USER ${req.params.username} REQUEST RECEIVED`);
});

app.delete('/user/:username', (req, res) => { /**+-Método DELETE para cuando el Navegador le quiere Borrar un Dato al Servidor.*/
    const { username } = req.params;

    res.send(`User ${username} Deleted`);
});

/**+-(11)-MOTOR DE PLANTILLAS EJS:_ Aquí abajo mostraremos cómo Renderizamos los Datos que creamos en la const "data" en nuestro Archivo "index.ejs". Ir a ese Archivo para seguir Aprendiendo.*/

app.get('/ejs', (req, res) => {
    const data = [{name: 'john'}, {name: 'paul'}, {name: 'piter'}];
    res.render('index.ejs', {people: data});
});


/**+-(9)-STATIC FILES (Servicio de archivos estáticos en Express):_  El Servicio de Archivos Estáticos en Express es un Middleware Preinstalado en Express.js con el que puede pasar 
 *  el Nombre del Directorio que contiene los Activos Estáticos a la Función de Middleware express.static para empezar directamente el servicio de los archivos. 
 * +-ESTE MIDDLEWARE SE EJECUTA ABAJO DE HABER DECLARADO TODAS LAS RUTAS.
 * Por ejemplo, utilice el siguiente código para el servicio de imágenes, archivos CSS y archivos JavaScript en un directorio denominado "public"
 * y podrá cargar los archivos que hay en el directorio "public". Aprende más en https://expressjs.com/es/starter/static-files.html .*/

app.use(express.static('public')); /**+-Ahora al Ir a la Ruta por Defecto "/" se Pintará en Pantalla en Archivo "index.html" al cual le hemos Escrito algunas cosas para esta Demostración
    y que está en la Carpeta "public".*/


app.listen(3000, ()=> {
    console.log(app.get('appName')); /**+-Ignorar esta Línea hasta la Parte Nº 10.*/
    console.log('Server on port 3000.');
});

