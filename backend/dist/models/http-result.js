"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResult = void 0;
class HttpResult {
    constructor(success, data, error) {
        this.success = success;
        this.data = data;
        this.error = error;
    }
    static Success(data = null) {
        return new HttpResult(true, data, "");
    }
    static Fail(error) {
        return new HttpResult(false, null, error);
    }
}
exports.HttpResult = HttpResult;
