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
var CreateApiResourceDto = /** @class */ (function () {
    function CreateApiResourceDto() {
    }
    __decorate([
        class_validator_1.IsString({ message: '名称格式不正确', context: { errorCode: api_error_code_enum_1.ApiErrorCode.USER_NAME_STRING } })
    ], CreateApiResourceDto.prototype, "name");
    __decorate([
        class_validator_1.IsString({ message: '描述不能为空', context: { errorCode: api_error_code_enum_1.ApiErrorCode.USER_NAME_STRING } })
    ], CreateApiResourceDto.prototype, "desc");
    __decorate([
        class_validator_1.IsString({ message: '值不能为空', context: { errorCode: api_error_code_enum_1.ApiErrorCode.USER_NAME_STRING } })
    ], CreateApiResourceDto.prototype, "value");
    __decorate([
        class_validator_1.IsString({ message: '类型不能为空', context: { errorCode: api_error_code_enum_1.ApiErrorCode.USER_NAME_STRING } })
    ], CreateApiResourceDto.prototype, "type");
    __decorate([
        class_validator_1.IsString({ message: 'parentId不能为空', context: { errorCode: api_error_code_enum_1.ApiErrorCode.USER_NAME_STRING } })
    ], CreateApiResourceDto.prototype, "parentId");
    __decorate([
        class_validator_1.IsString({ message: 'code不能为空', context: { errorCode: api_error_code_enum_1.ApiErrorCode.USER_NAME_STRING } })
    ], CreateApiResourceDto.prototype, "code");
    return CreateApiResourceDto;
}());
exports.CreateApiResourceDto = CreateApiResourceDto;
//# sourceMappingURL=create_apiResource.dto.js.map