declare module 'lightweight-charts' {
  export enum ColorType {
    Solid = 0,
    VerticalGradient = 1,
  }

  export interface ChartOptions {
    width?: number;
    height?: number;
    layout?: {
      background?: {
        type: ColorType;
        color: string;
      };
      textColor?: string;
    };
    grid?: {
      vertLines?: {
        color?: string;
      };
      horzLines?: {
        color?: string;
      };
    };
    timeScale?: {
      timeVisible?: boolean;
      secondsVisible?: boolean;
    };
  }

  export interface CandlestickSeriesOptions {
    upColor?: string;
    downColor?: string;
    borderVisible?: boolean;
    wickUpColor?: string;
    wickDownColor?: string;
  }

  export interface HistogramSeriesOptions {
    color?: string;
    priceFormat?: {
      type: string;
    };
    priceScaleId?: string;
    scaleMargins?: {
      top: number;
      bottom: number;
    };
  }

  export interface PriceLineOptions {
    price: number;
    color: string;
    lineWidth: number;
    lineStyle: number;
    axisLabelVisible: boolean;
    title: string;
  }

  export interface CandlestickData {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
  }

  export interface HistogramData {
    time: number;
    value: number;
    color?: string;
  }

  export interface IChartApi {
    applyOptions(options: ChartOptions): void;
    resize(width: number, height: number): void;
    timeScale(): ITimeScaleApi;
    addCandlestickSeries(options?: CandlestickSeriesOptions): ICandlestickSeriesApi;
    addHistogramSeries(options?: HistogramSeriesOptions): IHistogramSeriesApi;
    remove(): void;
  }

  export interface ITimeScaleApi {
    fitContent(): void;
  }

  export interface ICandlestickSeriesApi {
    setData(data: CandlestickData[]): void;
    createPriceLine(options: PriceLineOptions): void;
  }

  export interface IHistogramSeriesApi {
    setData(data: HistogramData[]): void;
  }

  export function createChart(container: HTMLElement, options?: ChartOptions): IChartApi;
}