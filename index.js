"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiServer = void 0;
const restify = __importStar(require("restify"));
const controllers_1 = require("../controllers");
class ApiServer {
    // private restify: Server;
    get(url, requestHandler) {
        this.addRoute('get', url, requestHandler);
        throw new Error("Method not implemented.");
    }
    post(url, requestHandler) {
        this.addRoute('post', url, requestHandler);
        throw new Error("Method not implemented.");
    }
    put(url, requestHandler) {
        this.addRoute('put', url, requestHandler);
        throw new Error("Method not implemented.");
    }
    delete(url, requestHandler) {
        this.addRoute('del', url, requestHandler);
        throw new Error("Method not implemented.");
    }
    addRoute(Method, url, requestHandler) {
        this.restify[Method](url, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield requestHandler(req, res, next);
            }
            catch (e) {
                console.log(e);
                res.send(500, e);
            }
        }));
        console.log(`Added route ${Method.toUpperCase()}:${url}`);
    }
    start(port) {
        this.restify = restify.createServer();
        this.restify.use(restify.plugins.bodyParser());
        this.restify.use(restify.plugins.queryParser());
        //Controller intialization
        controllers_1.CONTROLLERS.forEach(Controller => Controller.initialize(this));
        this.restify.listen(port, () => console.log(`Server is running on port ${port}`));
    }
}
exports.ApiServer = ApiServer;
