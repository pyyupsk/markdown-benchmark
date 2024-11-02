'use client'

import type { BenchmarkResult } from '@/lib/benchmark'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { NUM_ITERATIONS } from '@/constants/benchmark'
import {
    Bar,
    BarChart,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

export function BenchmarkResults({ results }: { results: BenchmarkResult[] }) {
    if (results.length === 0) return <p>No benchmark data available.</p>

    const fastestTime = results[0].duration

    const chartData = results.map((result) => ({
        duration: result.duration,
        name: result.parser,
        outputSize: result.outputSize / 1024,
        standardDeviation: result.standardDeviation,
    }))

    return (
        <div className="space-y-8 container py-20">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Performance Comparison ({NUM_ITERATIONS} iterations)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        className="h-[400px] w-full"
                        config={{
                            duration: {
                                color: 'hsl(var(--chart-1))',
                                label: 'Duration (ms):',
                            },
                            outputSize: {
                                color: 'hsl(var(--chart-2))',
                                label: 'Output Size (KB):',
                            },
                            standardDeviation: {
                                color: 'hsl(var(--chart-3))',
                                label: 'Standard Deviation:',
                            },
                        }}
                    >
                        <ResponsiveContainer height="100%" width="100%">
                            <BarChart data={chartData}>
                                <XAxis dataKey="name" />
                                <YAxis yAxisId="left" />
                                <YAxis orientation="right" yAxisId="right" />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Legend />
                                <Bar
                                    dataKey="duration"
                                    fill="var(--color-duration)"
                                    name="Duration (ms)"
                                    yAxisId="left"
                                />
                                <Bar
                                    dataKey="outputSize"
                                    fill="var(--color-outputSize)"
                                    name="Size (KB)"
                                    yAxisId="right"
                                />
                                <Bar
                                    dataKey="standardDeviation"
                                    fill="var(--color-standardDeviation)"
                                    name="Standard Deviation"
                                    yAxisId="right"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.map((result, index) => {
                    const relativeSpeed = result.duration / fastestTime
                    const isFirst = index === 0

                    return (
                        <Card key={result.parser}>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>{result.parser}</span>
                                    <Badge
                                        className="text-xs font-medium"
                                        variant={
                                            isFirst ? 'default' : 'secondary'
                                        }
                                    >
                                        {result.duration.toFixed(2)}ms ±{' '}
                                        {result.standardDeviation.toFixed(2)}ms
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                Relative Speed
                                            </span>
                                            <span className="font-medium">
                                                {relativeSpeed.toFixed(2)}x
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                Output Size
                                            </span>
                                            <span className="font-medium">
                                                {(
                                                    result.outputSize / 1024
                                                ).toFixed(2)}{' '}
                                                KB
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                Standard Deviation
                                            </span>
                                            <span className="font-medium">
                                                {result.standardDeviation.toFixed(
                                                    2,
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="relative h-2 overflow-hidden rounded-full bg-secondary">
                                        <div
                                            className={`absolute left-0 top-0 h-full rounded-full ${
                                                isFirst
                                                    ? 'bg-primary'
                                                    : 'bg-primary/60'
                                            }`}
                                            style={{
                                                width: `${(1 / relativeSpeed) * 100}%`,
                                            }}
                                        />
                                    </div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                className="w-full"
                                                variant="outline"
                                            >
                                                View Details
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="min-w-[800px]">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Detail of {result.parser}
                                                </DialogTitle>
                                            </DialogHeader>
                                            <p>
                                                Markdown to HTML with{' '}
                                                {result.parser}
                                            </p>
                                            <ScrollArea className="rounded-md border p-4 max-h-[38vh]">
                                                <pre className="text-xs text-muted-foreground">
                                                    {result.output}
                                                </pre>
                                            </ScrollArea>
                                            <p>
                                                Integrated with
                                                @tailwindcss/typography
                                            </p>
                                            <ScrollArea className="rounded-md border p-4 max-h-[38vh]">
                                                <div
                                                    className="prose prose-invert max-w-none"
                                                    dangerouslySetInnerHTML={{
                                                        __html: result.output,
                                                    }}
                                                />
                                            </ScrollArea>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
