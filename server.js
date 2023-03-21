const express = require("express");
const logger = require("morgan");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const passport = require("passport");
const session = require("express-session");
const parseArgs = require("minimist");
const log4js = require("./src/utils/logs");
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const MessageDAOMongoDB = require("./daos/MessageDAOMongoDB");
const MongoStore = require("connect-mongo");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("tiny"));
///
//
//
const login = require("./authentication/login");
const signup = require("./authentication/signup");
const serializeUser = require("./authentication/serializeUser");
const deserializeUser = require("./authentication/deserializeUser");

app.set("views", "./views");
app.set("view engine", "ejs");

const socketIoChat = require("./src/sockets/socketChat");
const socketIoProducts = require("./src/sockets/socketProducts");

const faker = require("faker");

const util = require("util");

const { Router } = require("express");

//------------------------------------- args ----------------------------------------//

const args = parseArgs(process.argv.slice(2));

// const PORT = args.p || 8080;
// httpServer.listen(PORT, () => console.log(`Servidor escuchando el puerto ${PORT}`));

//------------------------------------- args ----------------------------------------//

const loggerConsole = log4js.getLogger("default");
const loggerArchiveWarn = log4js.getLogger("warnArchive");
const loggerArchiveError = log4js.getLogger("errorArchive");

// Servidor: modo CLUSTER / FORK
//nodemon server --> ejecuta en puerto 8080
//nodemon server -p xxxx --> ejecuta en puerto xxxx

const cluster = require(`cluster`);
const numCPUs = require(`os`).cpus().length;

const CLUSTER = args.CLUSTER;

// const PORT = args.p || 8080;
const PORT = args.p || 8080;
const runServer = (PORT) => {
  httpServer.listen(PORT, () =>
    loggerConsole.debug(`Servidor escuchando el puerto ${PORT}`)
  );
};

if (CLUSTER) {
  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on(`exit`, (worker, code, signal) => {
      cluster.fork();
    });
  } else {
    runServer(PORT);
  }
} else {
  runServer(PORT);
}

//Middlewares
app.use((req, _res, next) => {
  loggerConsole.info(`
    Ruta consultada: ${req.originalUrl}
    Metodo ${req.method}`);
  next();
});

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/backend",
      ttl: 10,
    }),

    secret: "123456",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const isLogged = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.render("errorAccesoDenegado");
  }
};

//Authentication
login();
signup();
serializeUser();
deserializeUser();

// let users = [];

// //CRUD db
// const { selectAllProducts } = require("./src/db/selectAllProducts");
// const { insertProduct } = require("./src/db/insertProducts");

//Routers import
const homeRouter = require("./src/routes/homeRouter");
const formRouter = require("./src/routes/formRouter");
const loginRouterGet = require("./src/routes/loginRouterGet");
const loginRouterPost = require("./src/routes/loginRouterPost");
const chatRouter = require("./src/routes/chatRouter");
const fakerRouter = require("./src/routes/fakerRouter");
const infoRouter = require("./src/routes/infoRouter");
const indexRouter = require("./src/routes/index");
const infoRouterCompression = require("./src/routes/infoRouterCompression");
const objectRandomRouterGET = require("./src/routes/objectRandomGETRouter");
const objectRandomRouterPOST = require("./src/routes/objectRandomPOSTRouter");
const objectRandomRouterOUT = require("./src/routes/objectRandomOUTRouter");
const login2RouterGet = require("./src/routes/login2RouterGet");
const signup2Router = require("./src/routes/signup2Router");
const bienvenidaRouter = require("./src/routes/bienvenidaRouter");
const errorLogRouter = require("./src/routes/errorLogRouter");
const errorSignupRouter = require("./src/routes/errorSignupRouter");
const logoutRouter = require("./src/routes/logoutRouter");

//Routers
app.use("/", homeRouter);
app.use("/login2", login2RouterGet);
app.use("/form", isLogged, formRouter);
app.use("/login", isLogged, loginRouterGet);
app.use("/login", isLogged, loginRouterPost);
app.use("/chat", isLogged, chatRouter);
app.use("/api/productos-test", isLogged, fakerRouter);
app.use("/info", isLogged, infoRouter);
app.use("/api", isLogged, indexRouter);
app.use("/infoCompression", isLogged, infoRouterCompression);
app.use("/api/randoms", isLogged, objectRandomRouterGET);
app.use("/api/randoms", isLogged, objectRandomRouterPOST);
app.use("/objectRandomOUT", objectRandomRouterOUT);
app.use("/signup2", signup2Router);
app.use("/bienvenida", isLogged, bienvenidaRouter);
app.use("/errorLog", isLogged, errorLogRouter);
app.use("/errorSignup", isLogged, errorSignupRouter);
app.use("/logout", logoutRouter);

app.post(
  "/login2",
  passport.authenticate("login", {
    //indicamos el controlador de passport, llega desde el formulario de login.
    successRedirect: "/bienvenida", //redirect es con método get, vamos a home.
    failureRedirect: `/errorLog`, // redirect es con método get, vamos a /login de get.
    failureFlash: true, // nos permite enviar mensajes.
  })
);

app.post(
  "/signup2",
  passport.authenticate("signup", {
    //indicamos el controlador de passport, llega desde el formulario de signup.
    successRedirect: "/", // redirect es con método get, vamos a home.
    failureRedirect: "/errorSignup", // redirect es con método get, vamos a /signup de signup.
    failureFlash: true, // nos permite enviar mensajes.
  })
);

//Socket products:
socketIoChat(io);

//Socket chat:
socketIoProducts(io);

//Middlewares
app.use((req, res, next) => {
  loggerConsole.warn(`
    Estado: 404
    Ruta consultada: ${req.originalUrl}
    Metodo ${req.method}`);

  loggerArchiveWarn.warn(
    `Estado: 404, Ruta consultada: ${req.originalUrl}, Metodo ${req.method}`
  );

  res.status(404).json({
    error: -2,
    descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada`,
  });
  next();
});