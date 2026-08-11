/**
 * Single-series charts (Bar/Line/Area/Radar/Scatter) always use the brand
 * hue — one series never needs a categorical palette or a legend.
 * Pie is the only multi-category chart here, so it's the only one that
 * draws from the validated categorical palette (dataviz skill reference).
 */
export const SERIES_COLOR = "#f97316";

export const PIE_COLORS = {
  light: ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300"],
  dark: ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181", "#008300"],
};

export const CHART_CHROME = {
  light: { grid: "#e2e8f0", axis: "#cbd5e1", tick: "#64748b" },
  dark: { grid: "#1e293b", axis: "#334155", tick: "#94a3b8" },
};
