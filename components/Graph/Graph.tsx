"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Container } from "./Graph.style";
import type { GraphProps } from "./Graph.types";

export default function Graph({ data }: GraphProps) {
  const chartData = data.map((wpm, index) => ({
    time: index + 1,
    wpm,
  }));

  if (chartData.length === 0) {
    return <Container />;
  }

  return (
    <Container>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis
            dataKey="time"
            tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
            axisLine={{ stroke: "var(--color-border)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
            axisLine={{ stroke: "var(--color-border)" }}
            tickLine={false}
            width={30}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
            }}
            labelStyle={{ color: "var(--color-text-secondary)" }}
            itemStyle={{ color: "var(--color-primary)" }}
            formatter={(value) => [`${value} WPM`, "WPM"]}
            labelFormatter={(label) => `${label}s`}
          />
          <Line
            type="monotone"
            dataKey="wpm"
            stroke="var(--color-primary)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "var(--color-primary)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}
