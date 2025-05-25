interface Window {
  LightweightCharts: {
    createChart: (container: HTMLElement, options?: any) => any;
    ColorType: {
      Solid: number;
      VerticalGradient: number;
    };
  };
}