"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var ApiException = /** @class */ (function (_super) {
    __extends(ApiException, _super);
    function ApiException(errorMessage, errorCode, statusCode) {
        var _this = _super.call(this, errorMessage, statusCode) || this;
        _this.errorMessage = errorMessage;
        _this.errorCode = errorCode;
        return _this;
    }
    ApiException.prototype.getErrorCode = function () {
        return this.errorCode;
    };
    ApiException.prototype.getErrorMessage = function () {
        return this.errorMessage;
    };
    return ApiException;
}(common_1.HttpException));
exports.ApiException = ApiException;
//# sourceMappingURL=api.exception.js.map