"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const datasource_1 = require("../datasource");
const main_routes_1 = __importDefault(require("./routers/main.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 1501;
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use("/", main_routes_1.default);
datasource_1.AppDataSource.initialize()
    .then(async () => {
    console.log("Database Connected:");
})
    .catch((err) => console.log(err));
app.listen(port, () => {
    return console.log(`Express server is listening at http://localhost:${port} 🚀`);
});
