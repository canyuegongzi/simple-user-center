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
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var system_entity_1 = require("../../model/entity/system.entity");
var apiResource_entity_1 = require("../../model/entity/apiResource.entity");
var roleApiResource_entity_1 = require("../../model/entity/roleApiResource.entity");
var redisCache_service_1 = require("./redisCache.service");
var ApiResourceService = /** @class */ (function () {
    function ApiResourceService(systemRepository, apiResourceRepository, roleApiResourceEntityRepository, redisCacheService) {
        this.systemRepository = systemRepository;
        this.apiResourceRepository = apiResourceRepository;
        this.roleApiResourceEntityRepository = roleApiResourceEntityRepository;
        this.redisCacheService = redisCacheService;
    }
    ApiResourceService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(system_entity_1.System)),
        __param(1, typeorm_1.InjectRepository(apiResource_entity_1.ApiResource)),
        __param(2, typeorm_1.InjectRepository(roleApiResource_entity_1.RoleApiResourceEntity)),
        __param(3, common_1.Inject(redisCache_service_1.RedisCacheService))
    ], ApiResourceService);
    return ApiResourceService;
}());
exports.ApiResourceService = ApiResourceService;
//# sourceMappingURL=apiResource.service.js.map