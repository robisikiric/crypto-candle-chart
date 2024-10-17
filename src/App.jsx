import * as React from "react";
import { appTheme } from "./theme";
import { SciChartReact, SciChartNestedOverview } from "scichart-react";
import { drawChart, overviewOptions } from "./drawChart";

// React component needed as our examples app is react.
// SciChart can be used in Angular, Vue, Blazor and vanilla JS! See our Github repo for more info
export default function CandlestickChart({dataSource}) {

    let initFunc = drawChart(dataSource);
    return (
        <React.Fragment>
            <section id="trade-chart" className='ChartWrapper' style={{ background: appTheme.DarkIndigo }}>
                <SciChartReact
                    key={dataSource}
                    initChart={initFunc}
                    onInit={(initResult) => {}}
                    style={{ display: "flex", flexDirection: "column", height: "calc(100% - 70px)", width: "100%" }}
                    innerContainerProps={{ style: { flexBasis: "80%", flexGrow: 1, flexShrink: 1 } }}
                >
                    <SciChartNestedOverview
                        style={{ flexBasis: "20%", flexGrow: 1, flexShrink: 1 }}
                        options={overviewOptions}
                    />
                </SciChartReact>
            </section>
        </React.Fragment>
    );
}
