"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EPSILON = exports.DEFAULT_HEIGHT = exports.DEFAULT_WIDTH = exports.IS_TEST_ENV = void 0;
var IS_TEST_ENV = false;
exports.IS_TEST_ENV = IS_TEST_ENV;
if (typeof process !== "undefined") {
    exports.IS_TEST_ENV = IS_TEST_ENV = ((_a = process.env) === null || _a === void 0 ? void 0 : _a.TEST_ENV) === "1";
}
exports.DEFAULT_WIDTH = 900;
exports.DEFAULT_HEIGHT = 600;
exports.EPSILON = 0.0001;
