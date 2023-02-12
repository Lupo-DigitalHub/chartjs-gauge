/*!
 * chartjs-gauge-v3 v3.0.0
 * https://uk-taniyama.github.io/chartjs-gauge/
 * (c) 2023 chartjs-gauge-v3 Contributors
 * Released under the MIT License
 */
import { Color, FontSpec, DoughnutControllerChartOptions, ScriptableAndArrayOptions, ScriptableContext, DoughnutControllerDatasetOptions, DoughnutDataPoint, DoughnutMetaExtensions, DoughnutController, Chart, UpdateMode, Element } from 'chart.js';

interface NeedleOptions {
    /**
     * Needle circle.
     * String ending with '%' means percentage of the chart radius, number means pixels.
     * @default '10%'
     */
    radius: number | string;
    /**
     * Needle width.
     * String ending with '%' means percentage of the chart radius, number means pixels.
     * @default '15%'
     */
    width: number | string;
    /**
     * Needle length.
     * String ending with '%' means percentage of the chart radius, number means pixels.
     * @default '80%'
     */
    length: number | string;
    /**
     * The color of the needle.
     * (Color)[https://www.chartjs.org/docs/latest/api/#color]
     */
    color: Color;
}
interface ValueLabelOptions {
    /**
     * If true, display the value label.
     * @default true
     */
    display: boolean;
    /**
     * The font size of the label.
     * (FontSpec)[https://www.chartjs.org/docs/latest/api/interfaces/FontSpec.html]
     */
    font: FontSpec;
    /**
     * Returns the string representation of the value as it should be displayed on the chart.
     * @default Math.round
     */
    formatter?: (value: number) => number | string;
    /**
     * The text color of the label.
     * (Color)[https://www.chartjs.org/docs/latest/api/#color]
     */
    color: Color;
    /**
     * The background color of the label.
     * (Color)[https://www.chartjs.org/docs/latest/api/#color]
     */
    backgroundColor: Color;
    /**
     * The border color of the label.
     * (Color)[https://www.chartjs.org/docs/latest/api/#color]
     */
    borderColor: Color;
    /**
     * The border width of the label.
     */
    borderWidth: number;
    /**
     * The border radius of the label.
     * @default 5
     */
    borderRadius: number;
    /**
     * The padding of the label.
     */
    padding: {
        /**
         * @default 5
         */
        top: number;
        /**
         * @default 5
         */
        right: number;
        /**
         * @default 5
         */
        bottom: number;
        /**
         * @default 5
         */
        left: number;
    };
    /**
     * The offset x from needle center x.
     * String ending with '%' means percentage of the chart radius, number means pixels.
     * @default 0
     */
    offsetX: number | string;
    /**
     * The offset y from needle center y.
     * String ending with '%' means percentage of the chart radius, number means pixels.
     * @default 0
     */
    offsetY: number | string;
}
/**
 * [DoughnutControllerChartOptions](https://www.chartjs.org/docs/3.6.0/api/interfaces/DoughnutControllerChartOptions.html)
 * ```
 * cutout: '50%',
 * rotation: -90,
 * circumference: 180,
 * ```
 */
interface GaugeControllerChartOptions extends DoughnutControllerChartOptions {
    needle: ScriptableAndArrayOptions<NeedleOptions, ScriptableContext<'gauge'>>;
    valueLabel: ScriptableAndArrayOptions<ValueLabelOptions, ScriptableContext<'gauge'>>;
    /**
     * Value used for the needle.
     * @default 0
     */
    value: number;
    /**
      * Used to offset the start value.
      * @default 0
      */
    minValue: number;
}
/**
 * [DoughnutControllerDatasetOptions](https://www.chartjs.org/docs/3.6.0/api/interfaces/DoughnutControllerDatasetOptions.html)
 */
interface GaugeControllerDatasetOptions extends DoughnutControllerDatasetOptions {
    needle: ScriptableAndArrayOptions<NeedleOptions, ScriptableContext<'gauge'>>;
    valueLabel: ScriptableAndArrayOptions<ValueLabelOptions, ScriptableContext<'gauge'>>;
    /**
     * Value used for the needle.
     * @default 0
     */
    value: number;
    /**
      * Used to offset the start value.
      * @default 0
      */
    minValue: number;
}
type GaugeDataPoint = DoughnutDataPoint;
/**
 * @private
 */
interface GaugeMetaExtensions extends DoughnutMetaExtensions {
    _parsed: number[];
}
declare module 'chart.js' {
    interface ChartTypeRegistry {
        gauge: {
            chartOptions: GaugeControllerChartOptions;
            datasetOptions: GaugeControllerDatasetOptions;
            defaultDataPoint: GaugeDataPoint;
            metaExtensions: GaugeMetaExtensions;
            parsedDataType: number;
            scales: keyof CartesianScaleTypeRegistry;
        };
    }
}
declare class GaugeController extends DoughnutController {
    static readonly id = "gauge";
    constructor(chart: Chart, datasetIndex: number);
    drawNeedle(): void;
    drawValueLabel(): void;
    update(mode: UpdateMode): void;
    updateElements(elements: Element[], start: number, count: number, mode: UpdateMode): void;
    draw(): void;
}

export { GaugeController, GaugeControllerChartOptions, GaugeControllerDatasetOptions, GaugeDataPoint, GaugeMetaExtensions, NeedleOptions, ValueLabelOptions };
