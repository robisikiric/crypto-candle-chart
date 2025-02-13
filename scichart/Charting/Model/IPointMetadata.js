"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateMetadataGenerator = void 0;
var TemplateMetadataGenerator = /** @class */ (function () {
    function TemplateMetadataGenerator(template) {
        this.template = template;
    }
    TemplateMetadataGenerator.prototype.getSingleMetadata = function () {
        return Object.assign({}, this.template);
    };
    TemplateMetadataGenerator.prototype.getMetadata = function () {
        return undefined;
    };
    TemplateMetadataGenerator.prototype.toJSON = function () {
        // No type needed here.  Plain metadata objects automatically get wrapped into this generator
        if ("toJSON" in this.template) {
            // @ts-ignore
            return this.template.toJSON();
        }
        else {
            return this.template;
        }
    };
    return TemplateMetadataGenerator;
}());
exports.TemplateMetadataGenerator = TemplateMetadataGenerator;
