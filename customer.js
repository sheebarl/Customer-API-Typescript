"use strict";
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
exports.customerService = exports.CustomerService = void 0;
const customer_1 = require("../models/customer");
const index_1 = require("../database/index");
class CustomerService {
    // public async getById(id: number): Promise<Customer>{
    //const connection = await DatabaseProvider.getConnection();
    //return await connection.getRepository(Customer).findOneBy(id);
    // }
    create(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield index_1.DatabaseProvider.getConnection();
            return yield connection.getRepository(customer_1.Customer).save(customer);
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield index_1.DatabaseProvider.getConnection();
            return yield connection.getRepository(customer_1.Customer).find();
        });
    }
}
exports.CustomerService = CustomerService;
exports.customerService = new CustomerService();
