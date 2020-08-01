"use strict";
exports.__esModule = true;
var ApiErrorCode;
(function (ApiErrorCode) {
    ApiErrorCode[ApiErrorCode["TIMEOUT"] = -1] = "TIMEOUT";
    ApiErrorCode[ApiErrorCode["SUCCESS"] = 0] = "SUCCESS";
    ApiErrorCode[ApiErrorCode["TOKEN_FAIL"] = 30001] = "TOKEN_FAIL";
    ApiErrorCode[ApiErrorCode["USER_ID_INVALID"] = 10001] = "USER_ID_INVALID";
    ApiErrorCode[ApiErrorCode["USER_NAME_HAVA"] = 10002] = "USER_NAME_HAVA";
    ApiErrorCode[ApiErrorCode["USER_NAME_NO"] = 10003] = "USER_NAME_NO";
    ApiErrorCode[ApiErrorCode["USER_NICKNAME_NO"] = 10004] = "USER_NICKNAME_NO";
    ApiErrorCode[ApiErrorCode["USER_EMAIL_NO"] = 10005] = "USER_EMAIL_NO";
    ApiErrorCode[ApiErrorCode["USER_PASSWORD_FALSE"] = 10006] = "USER_PASSWORD_FALSE";
    // 用户模块
    ApiErrorCode[ApiErrorCode["USER_NAME_STRING"] = 15000] = "USER_NAME_STRING";
    ApiErrorCode[ApiErrorCode["USER_AGE_NUMBER"] = 15001] = "USER_AGE_NUMBER";
    ApiErrorCode[ApiErrorCode["USER_ADDRESS_ADDRESS"] = 15002] = "USER_ADDRESS_ADDRESS";
    ApiErrorCode[ApiErrorCode["USER_EMAIL_EMAIL"] = 15003] = "USER_EMAIL_EMAIL";
    ApiErrorCode[ApiErrorCode["USER_LIST_FILED"] = 15004] = "USER_LIST_FILED";
    // 权限角色模块
    ApiErrorCode[ApiErrorCode["ROLE_ALERDY_HAVE"] = 15004] = "ROLE_ALERDY_HAVE";
    ApiErrorCode[ApiErrorCode["ROLE_AUTH_ERROR"] = 15005] = "ROLE_AUTH_ERROR";
    // 角色
    ApiErrorCode[ApiErrorCode["ROLE_ALEDRY_HAVE"] = 15006] = "ROLE_ALEDRY_HAVE";
    // 书籍
    ApiErrorCode[ApiErrorCode["BOOK_NAME_FAIL"] = 20001] = "BOOK_NAME_FAIL";
    ApiErrorCode[ApiErrorCode["BOOK_PUBLISH_FAIL"] = 20002] = "BOOK_PUBLISH_FAIL";
    ApiErrorCode[ApiErrorCode["BOOK_PRICE_FAIL"] = 20003] = "BOOK_PRICE_FAIL";
    ApiErrorCode[ApiErrorCode["BOOK_DESC_FAIL"] = 20004] = "BOOK_DESC_FAIL";
    ApiErrorCode[ApiErrorCode["BOOK_VIEWS_COUNT"] = 20005] = "BOOK_VIEWS_COUNT";
    // 聊天软件  错误枚举
    // 聊天用户的信息
    ApiErrorCode[ApiErrorCode["USER_NO_REGISTER"] = 20006] = "USER_NO_REGISTER";
    ApiErrorCode[ApiErrorCode["USER_NO_LOGIN"] = 20007] = "USER_NO_LOGIN";
    ApiErrorCode[ApiErrorCode["USER_NO_MESSAGE"] = 20008] = "USER_NO_MESSAGE";
    ApiErrorCode[ApiErrorCode["USER_INFO_NO_PERFECT"] = 20009] = "USER_INFO_NO_PERFECT";
    ApiErrorCode[ApiErrorCode["USER_lOGIN_PASSWORD_FAIL"] = 20010] = "USER_lOGIN_PASSWORD_FAIL";
    ApiErrorCode[ApiErrorCode["USER_lOGIN_USERNAME_FAIL"] = 20011] = "USER_lOGIN_USERNAME_FAIL";
    ApiErrorCode[ApiErrorCode["USER_SERVER_FAIL"] = 20012] = "USER_SERVER_FAIL";
    ApiErrorCode[ApiErrorCode["ROLE_LIST_FAILED"] = 20013] = "ROLE_LIST_FAILED";
    ApiErrorCode[ApiErrorCode["ORIZATION_CREATED_FILED"] = 20014] = "ORIZATION_CREATED_FILED";
    ApiErrorCode[ApiErrorCode["PARAMS_DELETIONl"] = 30000] = "PARAMS_DELETIONl";
    ApiErrorCode[ApiErrorCode["ORIZATION_UPDATE_FILED"] = 30002] = "ORIZATION_UPDATE_FILED";
    ApiErrorCode[ApiErrorCode["ORIZATION_UPDATE_USER_NOT"] = 30003] = "ORIZATION_UPDATE_USER_NOT";
    ApiErrorCode[ApiErrorCode["ORIZATION_DELETE_FILED"] = 30005] = "ORIZATION_DELETE_FILED";
    ApiErrorCode[ApiErrorCode["AUTHORITY_CREATED_FILED"] = 30006] = "AUTHORITY_CREATED_FILED";
    ApiErrorCode[ApiErrorCode["AUTHORITY_UPDATE_FILED"] = 30007] = "AUTHORITY_UPDATE_FILED";
    ApiErrorCode[ApiErrorCode["AUTHORITY_DELETE_FILED"] = 30008] = "AUTHORITY_DELETE_FILED";
    ApiErrorCode[ApiErrorCode["AUTHORITY_LIST_FILED"] = 30008] = "AUTHORITY_LIST_FILED";
    ApiErrorCode[ApiErrorCode["AUTHORITY_CODE_INFO_FILED"] = 30008] = "AUTHORITY_CODE_INFO_FILED";
})(ApiErrorCode = exports.ApiErrorCode || (exports.ApiErrorCode = {}));
//# sourceMappingURL=api-error-code.enum.js.map