"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdornerLayer = void 0;
var AdornerLayer = /** @class */ (function () {
    function AdornerLayer(scs) {
        this.parentSurface = scs;
    }
    AdornerLayer.prototype.selectAnnotation = function (args) {
        var scs = this.parentSurface;
        var selectedAnnotation;
        var selectAnnotationHelper = function (annotations) {
            for (var i = annotations.length - 1; i >= 0; i--) {
                var anBase = annotations[i];
                /** Allow all annotations to be clicked.  Only select if editable */
                var isAnnotationSelected = anBase.click(args, !selectedAnnotation && anBase.isEditable);
                if (isAnnotationSelected) {
                    selectedAnnotation = anBase;
                }
            }
        };
        selectAnnotationHelper(scs.annotations.asArray());
        selectAnnotationHelper(scs.modifierAnnotations.asArray());
        this.selectedAnnotationProperty = selectedAnnotation;
        return !!selectedAnnotation;
    };
    AdornerLayer.prototype.deselectAnnotation = function (annotation) {
        if (this.selectedAnnotationProperty === annotation)
            this.selectedAnnotationProperty = undefined;
    };
    Object.defineProperty(AdornerLayer.prototype, "selectedAnnotation", {
        get: function () {
            return this.selectedAnnotationProperty;
        },
        set: function (value) {
            this.selectedAnnotationProperty = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AdornerLayer.prototype, "isAnnotationSelected", {
        get: function () {
            return !!this.selectedAnnotationProperty;
        },
        enumerable: false,
        configurable: true
    });
    return AdornerLayer;
}());
exports.AdornerLayer = AdornerLayer;
