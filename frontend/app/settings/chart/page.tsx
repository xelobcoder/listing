"use client"

import * as React from "react"
import { TrendingUp, Home, Building, MapPin, DollarSign } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
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

const propertyData = [
    { type: "HOUSE", count: 275, fill: "hsl(var(--chart-1))" },
    { type: "APARTMENT", count: 200, fill: "hsl(var(--chart-2))" },
    { type: "CONDO", count: 187, fill: "hsl(var(--chart-3))" },
    { type: "LAND", count: 73, fill: "hsl(var(--chart-4))" },
    { type: "COMMERCIAL", count: 90, fill: "hsl(var(--chart-5))" },
]

const chartConfig = {
    count: {
        label: "Properties",
    },
    HOUSE: {
        label: "Houses",
        color: "hsl(var(--chart-1))",
    },
    APARTMENT: {
        label: "Apartments",
        color: "hsl(var(--chart-2))",
    },
    CONDO: {
        label: "Condos",
        color: "hsl(var(--chart-3))",
    },
    LAND: {
        label: "Land",
        color: "hsl(var(--chart-4))",
    },
    COMMERCIAL: {
        label: "Commercial",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

export default function AdminDashboard() {
    const totalProperties = React.useMemo(() => {
        return propertyData.reduce((acc, curr) => acc + curr.count, 0)
    }, [])

    return (
        <div className="container mx-auto p-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Summary Cards - Standardized shadcn styling */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                        <Home className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalProperties}</div>
                        <p className="text-xs text-muted-foreground">
                            +20% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                        <Building className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">245</div>
                        <p className="text-xs text-muted-foreground">
                            +15% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$1.2M</div>
                        <p className="text-xs text-muted-foreground">
                            +12% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Locations</CardTitle>
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">15</div>
                        <p className="text-xs text-muted-foreground">
                            +2 new locations
                        </p>
                    </CardContent>
                </Card>

                {/* Property Distribution Chart */}
                <Card className="col-span-full">
                    <CardHeader className="pb-2">
                        <CardTitle>Property Distribution</CardTitle>
                        <CardDescription>Property Types Overview</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <ChartContainer
                            config={chartConfig}
                            className="aspect-square w-full max-w-3xl"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={propertyData}
                                    dataKey="count"
                                    nameKey="type"
                                    innerRadius="60%"
                                    outerRadius="80%"
                                    paddingAngle={4}
                                >
                                    <Label
                                        content={({ viewBox }) => {
                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                return (
                                                    <text
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                    >
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            className="text-2xl font-bold"
                                                        >
                                                            {totalProperties}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={viewBox.cy + 20}
                                                            className="text-sm text-muted-foreground"
                                                        >
                                                            Total
                                                        </tspan>
                                                    </text>
                                                )
                                            }
                                        }}
                                    />
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-2 text-sm">
                            <TrendingUp className="h-4 w-4" />
                            <span className="font-medium">+15.2% monthly growth</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Distribution of property types in our portfolio
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
