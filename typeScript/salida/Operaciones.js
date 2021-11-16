"use strict";
exports.__esModule = true;
exports.Operaciones = void 0;
var Operaciones = /** @class */ (function () {
    function Operaciones() {
    }
    Operaciones.prototype.resta = function (numero1, numero2) {
        return numero1 - numero2;
    };
    Operaciones.prototype.suma = function (numero1, numero2) {
        return numero1 + numero2;
    };
    Operaciones.prototype.multiplicacion = function (numero1, numero2) {
        var result = 0;
        for (var i = 1; i <= numero1; i++) {
            result = result + numero2;
        }
        return result;
    };
    return Operaciones;
}());
exports.Operaciones = Operaciones;
