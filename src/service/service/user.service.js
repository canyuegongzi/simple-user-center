"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var role_entity_1 = require("../../model/entity/role.entity");
var api_exception_1 = require("../../common/error/exceptions/api.exception");
var api_error_code_enum_1 = require("../../config/api-error-code.enum");
var user_entity_1 = require("../../model/entity/user.entity");
var data_time_1 = require("../../utils/data-time");
var config_1 = require("../../config/config");
var redisCache_service_1 = require("./redisCache.service");
var nodemailer = require("nodemailer");
var UserService = /** @class */ (function () {
    function UserService(userRepository, roleRepository, redisCacheService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.redisCacheService = redisCacheService;
    }
    /**
     * 创建用户
     * @param user
     */
    UserService.prototype.creatUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var role, e_1, e_2, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        role = void 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.roleRepository
                                .createQueryBuilder('r')
                                .where('r.id = :id', { id: user.roleId || 0 })
                                .getOne()];
                    case 2:
                        role = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        throw new api_exception_1.ApiException('角色不存在', api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.userRepository
                                .createQueryBuilder('u')
                                .insert()
                                .into(user_entity_1.User)
                                .values([{
                                    crateTime: data_time_1.formatDate(),
                                    updateTime: data_time_1.formatDate(),
                                    password: user.password,
                                    name: user.name,
                                    desc: user.desc,
                                    role: role,
                                    email: user.email,
                                    nick: user.nick,
                                    address: user.address,
                                    phone: user.phone,
                                    age: user.age,
                                }])
                                .execute()];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        e_2 = _a.sent();
                        throw new api_exception_1.ApiException('注册失败', api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        e_3 = _a.sent();
                        throw new api_exception_1.ApiException('注册失败', api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 用户注册
     * @param user
     */
    UserService.prototype.registerUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var role, e_4, e_5, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        role = void 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.roleRepository
                                .createQueryBuilder('r')
                                .where('r.name = :name', { name: 'user' })
                                .getOne()];
                    case 2:
                        role = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        throw new api_exception_1.ApiException('角色不存在', api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.userRepository
                                .createQueryBuilder('u')
                                .insert()
                                .into(user_entity_1.User)
                                .values([{
                                    crateTime: data_time_1.formatDate(),
                                    updateTime: data_time_1.formatDate(),
                                    password: user.password,
                                    name: user.name,
                                    role: role,
                                    verification: true,
                                    email: user.email,
                                    nick: user.nick,
                                }])
                                .execute()];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        e_5 = _a.sent();
                        throw new api_exception_1.ApiException('注册失败', api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        e_6 = _a.sent();
                        throw new api_exception_1.ApiException('注册失败', api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 用户登录
     * @param params
     */
    UserService.prototype.login = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        return [4 /*yield*/, this.userRepository
                                .createQueryBuilder('u')
                                .where('u.name = :name', { name: params.name })
                                .andWhere('u.password = :password', { password: params.password })
                                .getOne()];
                    case 1:
                        res = _a.sent();
                        if (res) {
                            return [2 /*return*/, res];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        e_7 = _a.sent();
                        return [4 /*yield*/, e_7];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 退出登录
     * @param req
     */
    UserService.prototype.loginOut = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 1, , 3]);
                        req.session.userName = null; // 删除session
                        return [2 /*return*/, true];
                    case 1:
                        e_8 = _a.sent();
                        return [4 /*yield*/, e_8];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 查询用户的信息
     * @param query
     */
    UserService.prototype.getUserInfo = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.userRepository
                                .createQueryBuilder('u')
                                .where('u.id = :id', { id: query })
                                .leftJoinAndSelect('u.role', 'role')
                                .select([
                                'u',
                                'role.name',
                                'role.id',
                                'u.email',
                                'u.password',
                                'u.phone',
                            ])
                                .getOne()];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res];
                    case 2:
                        if (_a.sent()) {
                            return [2 /*return*/, { data: res, flag: true }];
                        }
                        else {
                            return [2 /*return*/, { data: res, flag: false }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_9 = _a.sent();
                        return [2 /*return*/, e_9];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 通过用户名查看
     * @param name
     */
    UserService.prototype.findOneByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.findOne({ name: name })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_10 = _a.sent();
                        throw new api_exception_1.ApiException('查询失败', api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 通过邮件查看
     * @param name
     */
    UserService.prototype.findOneByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var e_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.findOne({ email: email })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_11 = _a.sent();
                        throw new api_exception_1.ApiException('查询失败', api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 查询用户列表
     * @param query
     */
    UserService.prototype.getList = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var queryConditionList, leftJoinConditionList, leftJoinConditionOrganizations, queryCondition, leftJoinCondition, res, e_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        queryConditionList = ['u.isDelete = :isDelete'];
                        leftJoinConditionList = [];
                        leftJoinConditionOrganizations = {};
                        if (query.roleId) {
                            queryConditionList.push('u.roleId = :roleId');
                        }
                        if (query.name) {
                            queryConditionList.push('u.name LIKE :name');
                        }
                        if (query.email) {
                            queryConditionList.push('u.email = :email');
                        }
                        if (query.nick) {
                            queryConditionList.push('u.nick LIKE :nick');
                        }
                        if (query.startAge) {
                            queryConditionList.push('u.age >= :startAge');
                        }
                        if (query.endAge) {
                            queryConditionList.push('u.age <= :endAge');
                        }
                        if (query.orgId) {
                            leftJoinConditionList.push('org.id = :id');
                            queryConditionList.push('org.id = :organizationId');
                            leftJoinConditionOrganizations = { id: query.orgId };
                        }
                        queryCondition = queryConditionList.join(' AND ');
                        leftJoinCondition = leftJoinConditionList.join('');
                        return [4 /*yield*/, this.userRepository
                                .createQueryBuilder('u')
                                .leftJoinAndSelect('u.role', 'r')
                                .leftJoinAndSelect('u.organizations', 'org', leftJoinCondition, leftJoinConditionOrganizations)
                                .where(queryCondition, {
                                name: "%" + query.name + "%",
                                nick: "%" + query.nick + "%",
                                roleId: query.roleId,
                                isDelete: query.isDel ? query.isDel : 0,
                                organizationId: query.orgId,
                                email: query.email,
                                startAge: Number(query.startAge),
                                endAge: Number(query.endAge),
                            })
                                .orderBy('u.name', 'ASC')
                                .addSelect(['u.email'])
                                .skip((query.page - 1) * query.pageSize)
                                .take(query.pageSize)
                                .getManyAndCount()];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, { data: res[0], count: res[1] }];
                    case 2:
                        e_12 = _a.sent();
                        throw new api_exception_1.ApiException('查询失败', api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 查询用户列表
     * @param query
     */
    UserService.prototype.getAllList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var queryConditionList, leftJoinConditionList, queryCondition, res, e_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        queryConditionList = ['u.isDelete = :isDelete'];
                        leftJoinConditionList = [];
                        queryCondition = queryConditionList.join(' AND ');
                        return [4 /*yield*/, this.userRepository
                                .createQueryBuilder('u')
                                .where(queryCondition, {
                                isDelete: 0,
                            })
                                .orderBy('u.name', 'ASC')
                                .getManyAndCount()];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, { data: res[0], count: res[1] }];
                    case 2:
                        e_13 = _a.sent();
                        throw new api_exception_1.ApiException('查询失败', api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 查询用户列表根据ids
     * @param query
     */
    UserService.prototype.getAllListByIds = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var e_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log(ids);
                        return [4 /*yield*/, this.userRepository.findByIds(ids)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_14 = _a.sent();
                        throw new api_exception_1.ApiException('查询失败', api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除用户
     * @param params
     */
    UserService.prototype.deleteUser = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var e_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository
                                .createQueryBuilder('u')
                                .update(user_entity_1.User)
                                .set({ isDelete: 1, deleteTime: data_time_1.formatDate() })
                                .whereInIds(params)
                                .execute()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_15 = _a.sent();
                        throw new api_exception_1.ApiException('删除失败', api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 更新用户
     * @param createUserDto
     */
    UserService.prototype.updateUser = function (createUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var role, e_16, e_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        role = void 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.roleRepository
                                .createQueryBuilder('r')
                                .where('r.id = :id', { id: createUserDto.roleId || 0 })
                                .getOne()];
                    case 2:
                        role = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_16 = _a.sent();
                        throw new api_exception_1.ApiException('角色不存在', api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 4: return [2 /*return*/, this.roleRepository
                            .createQueryBuilder('u')
                            .update(user_entity_1.User)
                            .set({ desc: createUserDto.desc, nick: createUserDto.nick, name: createUserDto.name,
                            password: createUserDto.password, role: role, address: createUserDto.address,
                            email: createUserDto.email, phone: createUserDto.phone, age: createUserDto.age, updateTime: data_time_1.formatDate() })
                            .where('id = :id', { id: createUserDto.id })
                            .execute()];
                    case 5:
                        e_17 = _a.sent();
                        throw new api_exception_1.ApiException('更新失败', api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 忘记密码
     * @param params
     */
    UserService.prototype.forgetPass = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var user, queryConditionList, queryCondition, e_18, mailOptions, sendEmailResult, e_19, e_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        user = void 0;
                        queryConditionList = ['u.isDelete = :isDelete', 'u.email = :email'];
                        queryCondition = queryConditionList.join(' AND ');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.userRepository
                                .createQueryBuilder('u')
                                .where(queryCondition, {
                                isDelete: 0,
                                email: params,
                            })
                                .orderBy('u.name', 'ASC')
                                .addSelect('u.password')
                                .getOne()];
                    case 2:
                        user = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_18 = _a.sent();
                        throw new api_exception_1.ApiException('邮箱不存在', api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 4:
                        if (!user) {
                            throw new api_exception_1.ApiException('用户不存在', api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                        }
                        mailOptions = {
                            from: '"系统用户安全认证中心（找回密码）" <1970305447@qq.com>',
                            to: params,
                            subject: '找回密码',
                            html: '<p>密码查询</p><p>用户名：' + user.name + '</p><p>密码：' + user.password + '</p>',
                        };
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.sendMailer(mailOptions)];
                    case 6:
                        sendEmailResult = _a.sent();
                        return [2 /*return*/, { success: true, data: sendEmailResult, message: '发送成功', code: 200 }];
                    case 7:
                        e_19 = _a.sent();
                        throw new api_exception_1.ApiException(e_19.message, api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        e_20 = _a.sent();
                        throw new api_exception_1.ApiException(e_20.errorMessage, api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 发送邮件
     */
    UserService.prototype.sendMailer = function (mailOptions) {
        var transporter = null;
        return new Promise(function (resolve, reject) {
            try {
                transporter = nodemailer.createTransport({
                    // host: 'smtp.ethereal.email',
                    service: 'QQ',
                    port: 465,
                    secureConnection: false,
                    auth: {
                        user: config_1.emailConfig.user,
                        pass: config_1.emailConfig.authPass,
                    },
                });
            }
            catch (e) {
                reject(e);
            }
            transporter.sendMail(mailOptions, function (error, info) {
                console.log(error);
                if (error) {
                    reject(error);
                }
                console.log(info);
                resolve(true);
                console.log('Message sent: %s', info.messageId);
            });
        });
    };
    /**
     * 发送邮件
     */
    UserService.prototype.sendEmailCode = function (userName, email) {
        return __awaiter(this, void 0, void 0, function () {
            var code, mailOptions, sendEmailResult, e_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        code = this.makCode();
                        mailOptions = {
                            from: '"系统用户安全认证中心（系统注册）" <1970305447@qq.com>',
                            to: email,
                            subject: '注册验证码',
                            html: "\u9A8C\u8BC1\u7801" + code + "\uFF0C\u7528\u4E8E\u6CE8\u518C/\u767B\u5F55\uFF0C5\u5206\u949F\u5185\u6709\u6548\u3002\u9A8C\u8BC1\u7801\u63D0\u4F9B\u7ED9\u4ED6\u4EBA\u53EF\u80FD\u5BFC\u81F4\u8D26\u53F7\u88AB\u76D7\uFF0C\u8BF7\u52FF\u6CC4\u6F0F\uFF0C\u8C28\u9632\u88AB\u9A97\u3002",
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.sendMailer(mailOptions)];
                    case 2:
                        sendEmailResult = _a.sent();
                        return [4 /*yield*/, this.redisCacheService.set(email, code, 3 * 60 * 1000)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { success: true, data: sendEmailResult, message: '发送成功', code: 200 }];
                    case 4:
                        e_21 = _a.sent();
                        throw new api_exception_1.ApiException(e_21.message, api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 验证邮箱验证码
     */
    UserService.prototype.verifyEmailCode = function (email, value) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_22;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.redisCacheService.get(email)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res && res === value];
                    case 2:
                        e_22 = _a.sent();
                        throw new api_exception_1.ApiException(e_22.message, api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 刷脸登录
     * @param params
     */
    UserService.prototype.faceLogin = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * 产生一个code
     */
    UserService.prototype.makCode = function () {
        var code = '';
        for (var i = 1; i <= 6; i++) {
            var num = Math.floor(Math.random() * 10);
            code += num;
        }
        return code;
    };
    /**
     * 用户信息验证
     * @param params
     */
    UserService.prototype.uniqueUser = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var queryObj, result, e_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        queryObj = {};
                        if (params.name) {
                            queryObj.name = params.name;
                        }
                        if (params.email) {
                            queryObj.email = params.email;
                        }
                        return [4 /*yield*/, this.userRepository.findOne(queryObj)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, !!!result];
                    case 2:
                        e_23 = _a.sent();
                        throw new api_exception_1.ApiException(e_23.message, api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
        __param(1, typeorm_1.InjectRepository(role_entity_1.Role)),
        __param(2, common_1.Inject(redisCache_service_1.RedisCacheService))
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map