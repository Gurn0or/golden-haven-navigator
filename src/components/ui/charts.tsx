
import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart as RechartsAreaChart,
  Area
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from './chart';

// Standard color palette for charts
const COLORS = ["#E5C07B", "#221F26", "#4C6EF5", "#12B886", "#FD7E14", "#FA5252"];

interface ChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

interface PieChartProps {
  data: any[];
  index: string;
  category: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export const BarChart = ({
  data,
  index,
  categories,
  colors = COLORS,
  valueFormatter = (value) => `${value}`,
  className,
}: ChartProps) => {
  return (
    <ChartContainer className={className} config={{}}>
      <RechartsBarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={index} />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend />
        {categories.map((category, i) => (
          <Bar key={category} dataKey={category} fill={colors[i % colors.length]} />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
};

export const LineChart = ({
  data,
  index,
  categories,
  colors = COLORS,
  valueFormatter = (value) => `${value}`,
  className,
}: ChartProps) => {
  return (
    <ChartContainer className={className} config={{}}>
      <RechartsLineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={index} />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend />
        {categories.map((category, i) => (
          <Line 
            key={category} 
            type="monotone" 
            dataKey={category} 
            stroke={colors[i % colors.length]} 
            activeDot={{ r: 8 }} 
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
};

export const AreaChart = ({
  data,
  index,
  categories,
  colors = COLORS,
  valueFormatter = (value) => `${value}`,
  className,
}: ChartProps) => {
  return (
    <ChartContainer className={className} config={{}}>
      <RechartsAreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={index} />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend />
        {categories.map((category, i) => (
          <Area 
            key={category} 
            type="monotone" 
            dataKey={category} 
            fill={colors[i % colors.length]} 
            stroke={colors[i % colors.length]} 
          />
        ))}
      </RechartsAreaChart>
    </ChartContainer>
  );
};

export const PieChart = ({
  data,
  index,
  category,
  colors = COLORS,
  valueFormatter = (value) => `${value}`,
  className,
}: PieChartProps) => {
  return (
    <ChartContainer className={className} config={{}}>
      <RechartsPieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey={category}
          nameKey={index}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltipContent />} />
        <Legend />
      </RechartsPieChart>
    </ChartContainer>
  );
};
