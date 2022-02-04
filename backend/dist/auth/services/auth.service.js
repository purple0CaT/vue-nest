"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const rxjs_1 = require("rxjs");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../models/user.entity");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    hashPassword(password) {
        return (0, rxjs_1.from)(bcrypt.hash(password, 10));
    }
    registerAccount(user) {
        const { firstname, lastname, email, password, role } = user;
        return this.hashPassword(password).pipe((0, rxjs_1.switchMap)((hashedPassword) => {
            return (0, rxjs_1.from)(this.userRepository.save({
                firstname,
                lastname,
                email,
                password: hashedPassword,
                role,
            })).pipe((0, rxjs_1.map)((user) => {
                delete user.password;
                return user;
            }));
        }));
    }
    validateUser(email, password) {
        return (0, rxjs_1.from)(this.userRepository.findOne({ email }, {
            select: ['id', 'firstname', 'lastname', 'email', 'password', 'role'],
        })).pipe((0, rxjs_1.switchMap)((user) => (0, rxjs_1.from)(bcrypt.compare(password, user.password)).pipe((0, rxjs_1.map)((isValidPassword) => {
            if (isValidPassword) {
                delete user.password;
                return user;
            }
        }))));
    }
    loginUser(user) {
        const { email, password } = user;
        return this.validateUser(email, password).pipe((0, rxjs_1.switchMap)((user) => {
            if (user) {
                return (0, rxjs_1.from)(this.jwtService.signAsync({ user }));
            }
        }));
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map