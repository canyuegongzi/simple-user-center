"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var class_validator_1 = require("class-validator");
var api_error_code_enum_1 = require("../../../config/api-error-code.enum");
var DeleteApiResourceDto = /** @class */ (function () {
    function DeleteApiResourceDto() {
        this.isDeleteChild = 0; // 0 默认删除所有子节点 ：1 只删除当前节点 ，当有子节点时操作失败
    }
    __decorate([
        class_validator_1.IsArray({ message: 'id格式不准确', context: { errorCode: api_error_code_enum_1.ApiErrorCode.USER_NAME_STRING } })
    ], DeleteApiResourceDto.prototype, "id");
    return DeleteApiResourceDto;
}());
exports.DeleteApiResourceDto = DeleteApiResourceDto;
//# sourceMappingURL=delete_apiResource.dto.js.map