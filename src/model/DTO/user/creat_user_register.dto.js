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
var CreateUserRegisterDto = /** @class */ (function () {
    function CreateUserRegisterDto() {
    }
    __decorate([
        class_validator_1.IsString({ message: '用户姓名格式不正确', context: { errorCode: api_error_code_enum_1.ApiErrorCode.USER_NAME_STRING } })
    ], CreateUserRegisterDto.prototype, "name");
    __decorate([
        class_validator_1.IsEmail({}, { message: '邮箱格式不正确', context: { errorCode: api_error_code_enum_1.ApiErrorCode.USER_EMAIL_EMAIL } })
    ], CreateUserRegisterDto.prototype, "email");
    __decorate([
        class_validator_1.IsString({ message: '密码', context: { errorCode: api_error_code_enum_1.ApiErrorCode.USER_ADDRESS_ADDRESS } })
    ], CreateUserRegisterDto.prototype, "password");
    return CreateUserRegisterDto;
}());
exports.CreateUserRegisterDto = CreateUserRegisterDto;
//# sourceMappingURL=creat_user_register.dto.js.map