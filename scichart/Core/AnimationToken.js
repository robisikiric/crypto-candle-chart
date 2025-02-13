"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationToken = void 0;
var AnimationToken = /** @class */ (function () {
    function AnimationToken(token, onCompleted) {
        this.token = token;
        this.onCompleted = onCompleted;
    }
    AnimationToken.prototype.cancelAnimation = function () {
        if (this.token) {
            clearInterval(this.token);
            this.token = undefined;
        }
    };
    AnimationToken.prototype.completeAnimation = function () {
        if (this.token) {
            clearInterval(this.token);
            this.token = undefined;
        }
        if (this.onCompleted) {
            this.onCompleted();
        }
    };
    return AnimationToken;
}());
exports.AnimationToken = AnimationToken;
