"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultSciChartLoader = void 0;
var Guard_1 = require("../../Core/Guard");
/**
 * The default {@link ISciChartLoader} implementation. Displays a loading animation when the chart starts up
 * @example
 * // If not set in SciChartSurface.create then the default loader is used
 * SciChartSurface.create("elementId", { loader: new DefaultSciChartLoader(); });
 */
var DefaultSciChartLoader = /** @class */ (function () {
    function DefaultSciChartLoader() {
    }
    /**
     * @inheritDoc
     */
    DefaultSciChartLoader.prototype.addChartLoader = function (domChartRoot, theme) {
        this.addLoaderStyles();
        Guard_1.Guard.notNull(domChartRoot, "domDivContainer");
        Guard_1.Guard.notNull(theme, "theme");
        // How this loader works. 8 divs are added to a parent <div>
        // the div:after in CSS has content=" " and a background color and border radius
        // This gives the appearance of round circles. Lastly the animation is done
        // entirely in CSS
        var loaderContainerDiv = document.createElement("div");
        loaderContainerDiv.style.background = theme.loadingAnimationBackground;
        loaderContainerDiv.style.height = "100%";
        loaderContainerDiv.style.width = "100%";
        loaderContainerDiv.style.position = "relative";
        loaderContainerDiv.style.zIndex = "11";
        var loaderDiv = document.createElement("div");
        var spinnerChunk = "<div><span style=\"background: ".concat(theme.loadingAnimationForeground, "\"/></div>");
        loaderDiv.innerHTML = spinnerChunk.repeat(8);
        loaderDiv.classList.add("scichart_loader");
        loaderContainerDiv.appendChild(loaderDiv);
        domChartRoot.appendChild(loaderContainerDiv);
        return loaderContainerDiv;
    };
    /**
     * @inheritDoc
     */
    DefaultSciChartLoader.prototype.removeChartLoader = function (domChartRoot, loaderElement) {
        try {
            domChartRoot.removeChild(loaderElement);
        }
        catch (err) {
            console.error(err);
        }
    };
    DefaultSciChartLoader.prototype.toJSON = function () {
        return { type: this.type };
    };
    DefaultSciChartLoader.prototype.addLoaderStyles = function () {
        if (DefaultSciChartLoader.hasStyles) {
            return;
        }
        var head = document.head;
        var style = document.createElement("style");
        style.id = DefaultSciChartLoader.sciChartLoaderStylesId;
        head.appendChild(style);
        style.appendChild(document.createTextNode(loaderCss));
        DefaultSciChartLoader.hasStyles = true;
    };
    DefaultSciChartLoader.hasStyles = false;
    DefaultSciChartLoader.sciChartLoaderStylesId = "scichart_default_loader_styles_id";
    return DefaultSciChartLoader;
}());
exports.DefaultSciChartLoader = DefaultSciChartLoader;
var loaderCss = "\n    .scichart_loader {\n      display: inline-block;\n      position: relative;\n      width: 80px;\n      height: 80px;\n      top: 50%;\n      transform: translateY(-50%);\n    }\n    .scichart_loader div {\n      animation: scichart_loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n      transform-origin: 40px 40px;\n    }\n    .scichart_loader div span {\n      display: block;\n      position: absolute;\n      width: 7px;\n      height: 7px;\n      border-radius: 50%;\n      margin: -4px 0 0 -4px;\n    }\n    .scichart_loader div:nth-child(1) {\n      animation-delay: -0.036s;\n    }\n    .scichart_loader div:nth-child(1) span {\n      top: 63px;\n      left: 63px;\n    }\n    .scichart_loader div:nth-child(2) {\n      animation-delay: -0.072s;\n    }\n    .scichart_loader div:nth-child(2) span {\n      top: 68px;\n      left: 56px;\n    }\n    .scichart_loader div:nth-child(3) {\n      animation-delay: -0.108s;\n    }\n    .scichart_loader div:nth-child(3) span {\n      top: 71px;\n      left: 48px;\n    }\n    .scichart_loader div:nth-child(4) {\n      animation-delay: -0.144s;\n    }\n    .scichart_loader div:nth-child(4) span {\n      top: 72px;\n      left: 40px;\n    }\n    .scichart_loader div:nth-child(5) {\n      animation-delay: -0.18s;\n    }\n    .scichart_loader div:nth-child(5) span {\n      top: 71px;\n      left: 32px;\n    }\n    .scichart_loader div:nth-child(6) {\n      animation-delay: -0.216s;\n    }\n    .scichart_loader div:nth-child(6) span {\n      top: 68px;\n      left: 24px;\n    }\n    .scichart_loader div:nth-child(7) {\n      animation-delay: -0.252s;\n    }\n    .scichart_loader div:nth-child(7) span {\n      top: 63px;\n      left: 17px;\n    }\n    .scichart_loader div:nth-child(8) {\n      animation-delay: -0.288s;\n    }\n    .scichart_loader div:nth-child(8) span {\n      top: 56px;\n      left: 12px;\n    }\n    @keyframes scichart_loader {\n      0% {\n        transform: rotate(0deg);\n      }\n      100% {\n        transform: rotate(360deg);\n      }\n    }\n";
