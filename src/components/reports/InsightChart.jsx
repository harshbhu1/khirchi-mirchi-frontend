import { useEffect } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartTooltip from "./ChartTooltip";
import { CHART_CHROME, PIE_COLORS, SERIES_COLOR } from "./chartColors";

const AXIS_STYLE_KEY = { fontSize: 11 };

/** Skips the >5% threshold slices to avoid overlapping direct labels on a busy pie. */
function pieLabel({ name, percent }) {
  return percent >= 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : "";
}

export default function InsightChart({ type, data, theme, valueLabel, scatterYLabel, onSettled }) {
  const chrome = CHART_CHROME[theme] ?? CHART_CHROME.light;
  const pieColors = PIE_COLORS[theme] ?? PIE_COLORS.light;
  const tick = { fill: chrome.tick, ...AXIS_STYLE_KEY };

  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid stroke={chrome.grid} strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="name"
            tick={tick}
            axisLine={{ stroke: chrome.axis }}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis tick={tick} axisLine={false} tickLine={false} width={48} />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: `${SERIES_COLOR}14` }} />
          <Bar
            dataKey="value"
            name={valueLabel}
            fill={SERIES_COLOR}
            radius={[6, 6, 0, 0]}
            maxBarSize={56}
            animationDuration={700}
            animationEasing="ease-out"
            onAnimationEnd={onSettled}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === "line") {
    return (
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid stroke={chrome.grid} strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="name"
            tick={tick}
            axisLine={{ stroke: chrome.axis }}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis tick={tick} axisLine={false} tickLine={false} width={48} />
          <Tooltip content={<ChartTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            name={valueLabel}
            stroke={SERIES_COLOR}
            strokeWidth={2}
            dot={{ r: 3, fill: SERIES_COLOR, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
            animationDuration={700}
            animationEasing="ease-out"
            onAnimationEnd={onSettled}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (type === "area") {
    return (
      <ResponsiveContainer width="100%" height={340}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <defs>
            <linearGradient id="insightAreaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={SERIES_COLOR} stopOpacity={0.35} />
              <stop offset="100%" stopColor={SERIES_COLOR} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={chrome.grid} strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="name"
            tick={tick}
            axisLine={{ stroke: chrome.axis }}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis tick={tick} axisLine={false} tickLine={false} width={48} />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            name={valueLabel}
            stroke={SERIES_COLOR}
            strokeWidth={2}
            fill="url(#insightAreaFill)"
            animationDuration={700}
            animationEasing="ease-out"
            onAnimationEnd={onSettled}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (type === "pie") {
    return (
      <ResponsiveContainer width="100%" height={360}>
        <PieChart margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <Tooltip content={<ChartTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, color: chrome.tick }}
            iconType="circle"
            iconSize={8}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="48%"
            innerRadius={62}
            outerRadius={110}
            paddingAngle={2}
            label={pieLabel}
            labelLine={false}
            animationDuration={700}
            animationEasing="ease-out"
            onAnimationEnd={onSettled}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={pieColors[index % pieColors.length]} stroke="none" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (type === "radar") {
    return (
      <ResponsiveContainer width="100%" height={360}>
        <RadarChart data={data} margin={{ top: 8, right: 24, left: 24, bottom: 8 }}>
          <PolarGrid stroke={chrome.grid} />
          <PolarAngleAxis dataKey="name" tick={tick} />
          <PolarRadiusAxis tick={{ fill: chrome.tick, fontSize: 10 }} axisLine={false} />
          <Tooltip content={<ChartTooltip />} />
          <Radar
            dataKey="value"
            name={valueLabel}
            stroke={SERIES_COLOR}
            fill={SERIES_COLOR}
            fillOpacity={0.35}
            strokeWidth={2}
            animationDuration={700}
            animationEasing="ease-out"
            onAnimationEnd={onSettled}
          />
        </RadarChart>
      </ResponsiveContainer>
    );
  }

  if (type === "scatter") {
    // Scatter has no onAnimationEnd in recharts — dots carry no direct labels
    // that could be caught mid-reveal, so skipping the animation entirely
    // keeps "settled" simple and correct rather than guessing at a duration.
    return <SettledScatterChart data={data} tick={tick} chrome={chrome} valueLabel={valueLabel} scatterYLabel={scatterYLabel} onSettled={onSettled} />;
  }

  return null;
}

function SettledScatterChart({ data, tick, chrome, valueLabel, scatterYLabel, onSettled }) {
  useEffect(() => {
    onSettled?.();
  }, [data, onSettled]);

  return (
    <ResponsiveContainer width="100%" height={340}>
      <ScatterChart margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
        <CartesianGrid stroke={chrome.grid} strokeDasharray="4 4" />
        <XAxis
          type="number"
          dataKey="x"
          name={valueLabel}
          tick={tick}
          axisLine={{ stroke: chrome.axis }}
          tickLine={false}
        />
        <YAxis
          type="number"
          dataKey="y"
          name={scatterYLabel}
          tick={tick}
          axisLine={false}
          tickLine={false}
          width={48}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ strokeDasharray: "4 4" }} />
        <Scatter
          data={data}
          name={`${valueLabel} vs ${scatterYLabel}`}
          fill={SERIES_COLOR}
          fillOpacity={0.75}
          isAnimationActive={false}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
