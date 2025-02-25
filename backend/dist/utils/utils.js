"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
class Utils {
    static ValorExiste(value) {
        return value !== undefined && value !== null && value !== '' && value !== false;
    }
    static EmailValido(email) {
        try {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailPattern.test(email) && typeof email == 'string';
        }
        catch {
            return false;
        }
    }
    static SenhaValida(password) {
        try {
            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
            return passwordPattern.test(password) && typeof password == 'string';
        }
        catch {
            return false;
        }
    }
    static NomeValido(name) {
        try {
            const parts = name.trim().split(/\s+/);
            if (parts.length < 2)
                return false;
            const isValid = parts.every((part) => {
                if (part.length < 2)
                    return false;
                return /^[a-zA-ZÀ-ÖØ-öø-ÿ'-]+$/.test(part);
            });
            return isValid && typeof name == 'string';
            ;
        }
        catch {
            return false;
        }
    }
}
exports.Utils = Utils;
