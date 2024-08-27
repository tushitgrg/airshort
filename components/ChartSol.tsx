"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [

  { month: "March", ethereum: 3417, solana: 130 },
  { month: "April", ethereum: 3216, solana: 183 },
  { month: "May", ethereum: 3787, solana: 148 },
  { month: "June", ethereum: 3380, solana: 163 },
  { month: "July", ethereum: 3310, solana: 180 },
  { month: "August", ethereum: 2735, solana: 140 },
]

const chartConfig = {
  ethereum: {
    label: "ethereum",
    color: "hsl(var(--chart-1))",
  },
  solana: {
    label: "solana",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ChartSol() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exchange Rates</CardTitle>
        <CardDescription>
          Showing Exchange Rates for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="ethereum"
              type="natural"
              fill="var(--color-solana)"
              fillOpacity={0.4}
              stroke="var(--color-solana)"
              stackId="a"
            />
         
          </AreaChart>
        </ChartContainer>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
          
            <Area
              dataKey="solana"
              type="natural"
              fill="var(--color-ethereum)"
              fillOpacity={0.4}
              stroke="var(--color-ethereum)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
   
    </Card>
  )
}
