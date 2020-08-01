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
var system_entity_1 = require("../../model/entity/system.entity");
var data_time_1 = require("../../utils/data-time");
var api_exception_1 = require("../../common/error/exceptions/api.exception");
var api_error_code_enum_1 = require("../../config/api-error-code.enum");
var SystemService = /** @class */ (function () {
    function SystemService(systemRepository) {
        this.systemRepository = systemRepository;
    }
    /*
   添加数据
  */
    SystemService.prototype.creatSystem = function (system) {
        return __awaiter(this, void 0, void 0, function () {
            var newSystem, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newSystem = new system_entity_1.System();
                        newSystem.desc = system.desc;
                        newSystem.value = system.value;
                        newSystem.crateTime = data_time_1.formatDate();
                        newSystem.updateTime = data_time_1.formatDate();
                        newSystem.name = system.name;
                        return [4 /*yield*/, this.systemRepository.save(newSystem)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        throw new api_exception_1.ApiException('添加失败', api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 更新角色
     * @param role
     */
    SystemService.prototype.updateSystem = function (system) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.systemRepository
                                .createQueryBuilder('s')
                                .update(system_entity_1.System)
                                .set({ desc: system.desc, name: system.name, value: system.value, updateTime: data_time_1.formatDate() })
                                .where('id = :id', { id: system.id })
                                .execute()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        throw new api_exception_1.ApiException('更新失败', api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除角色
     * @param id
     */
    SystemService.prototype.deleteSystem = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.systemRepository
                                .createQueryBuilder()
                                .update(system_entity_1.System)
                                .set({ isDelete: 1, deleteTime: data_time_1.formatDate() })
                                .whereInIds(ids)
                                .execute()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_3 = _a.sent();
                        throw new api_exception_1.ApiException('删除失败', api_error_code_enum_1.ApiErrorCode.USER_LIST_FILED, 200);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取角色详情
     * @param query
     */
    SystemService.prototype.getSystemInfo = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.systemRepository
                                .createQueryBuilder('s')
                                .where('s.id = :id', { id: query })
                                .getOne()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_4 = _a.sent();
                        throw new api_exception_1.ApiException('查询失败', api_error_code_enum_1.ApiErrorCode.ROLE_LIST_FAILED, 200);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 校验value的唯一性
     */
    SystemService.prototype.checkValue = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.systemRepository
                                .createQueryBuilder('s')
                                .where('s.value = :value', { value: query })
                                .getOne()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_5 = _a.sent();
                        throw new api_exception_1.ApiException('角色已经存在', api_error_code_enum_1.ApiErrorCode.ROLE_LIST_FAILED, 200);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 查看角色列表
     * @param query
     */
    SystemService.prototype.getList = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var queryConditionList, queryCondition, res, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        queryConditionList = ['s.isDelete = :isDelete'];
                        if (query.name) {
                            queryConditionList.push('s.name LIKE :name');
                        }
                        queryCondition = queryConditionList.join(' AND ');
                        return [4 /*yield*/, this.systemRepository
                                .createQueryBuilder('s')
                                .where(queryCondition, {
                                name: "%" + query.name + "%",
                                isDelete: 0,
                            })
                                .orderBy('s.name', 'ASC')
                                .addOrderBy('s.value')
                                .skip((query.page - 1) * query.pageSize)
                                .take(query.pageSize)
                                .getManyAndCount()];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, { data: res[0], count: res[1] }];
                    case 2:
                        e_6 = _a.sent();
                        throw new api_exception_1.ApiException('查询失败', api_error_code_enum_1.ApiErrorCode.ROLE_LIST_FAILED, 200);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 查询所有角色
     * @param query
     */
    SystemService.prototype.getAllList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var queryConditionList, queryCondition, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        queryConditionList = ['s.isDelete = :isDelete'];
                        queryCondition = queryConditionList.join(' AND ');
                        return [4 /*yield*/, this.systemRepository
                                .createQueryBuilder('s')
                                .where(queryCondition, {
                                isDelete: 0,
                            })
                                .orderBy('s.name', 'ASC')
                                .addOrderBy('s.value')
                                .getMany()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_7 = _a.sent();
                        throw new api_exception_1.ApiException('查询失败', api_error_code_enum_1.ApiErrorCode.ROLE_LIST_FAILED, 200);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SystemService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(system_entity_1.System))
    ], SystemService);
    return SystemService;
}());
exports.SystemService = SystemService;
//# sourceMappingURL=system.service.js.map