"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResult = void 0;
class HttpResult {
    // Usamos os métodos estáticos para criar uma instância.
    constructor(success, data, error) {
        this.success = success;
        this.data = data;
        this.error = error;
    }
    // Método para criar um resultado de sucesso
    // Pode receber dados, mas se nada for passado, assume null.
    static Success(data = null) {
        return new HttpResult(true, data, "");
    }
    // Método para criar um resultado de falha, definindo uma mensagem de erro.
    static Fail(error) {
        return new HttpResult(false, null, error);
    }
}
exports.HttpResult = HttpResult;
