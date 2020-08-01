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
var CreateUserDto = /** @class */ (function () {
    function CreateUserDto() {
    }
    __decorate([
        class_validator_1.IsString({ message: '用户姓名格式不正确', context: { errorCode: api_error_code_enum_1.ApiErrorCode.USER_NAME_STRING } })
    ], CreateUserDto.prototype, "name");
    __decorate([
        class_validator_1.IsString({ message: '用户年龄格式不准确', context: { errorCode: api_error_code_enum_1.ApiErrorCode.USER_AGE_NUMBER } })
    ], CreateUserDto.prototype, "age");
    __decorate([
        class_validator_1.IsEmail({}, { message: '邮箱格式不正确', context: { errorCode: api_error_code_enum_1.ApiErrorCode.USER_EMAIL_EMAIL } })
    ], CreateUserDto.prototype, "email");
    __decorate([
        class_validator_1.IsString({ message: '地址格式不正确', context: { errorCode: api_error_code_enum_1.ApiErrorCode.USER_ADDRESS_ADDRESS } })
    ], CreateUserDto.prototype, "address");
    __decorate([
        class_validator_1.IsString({ message: '密码', context: { errorCode: api_error_code_enum_1.ApiErrorCode.USER_ADDRESS_ADDRESS } })
    ], CreateUserDto.prototype, "password");
    __decorate([
        class_validator_1.IsNotEmpty({ message: '角色不能为空', context: { errorCode: api_error_code_enum_1.ApiErrorCode.USER_ADDRESS_ADDRESS } })
    ], CreateUserDto.prototype, "roleId");
    return CreateUserDto;
}());
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=creat_user.dto.js.map