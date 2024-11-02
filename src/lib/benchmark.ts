import { NUM_ITERATIONS, WARM_UP_ITERATIONS } from '@/constants/benchmark'
import fs from 'fs'
import { marked } from 'marked'
import { micromark } from 'micromark'
import {
    gfmStrikethrough,
    gfmStrikethroughHtml,
} from 'micromark-extension-gfm-strikethrough'
import { gfmTable, gfmTableHtml } from 'micromark-extension-gfm-table'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { Remarkable } from 'remarkable'
import showdown from 'showdown'
import snarkdown from 'snarkdown'
import { unified } from 'unified'
import { z } from 'zod'

const parsersList = [
    'remark-parse',
    'marked',
    'remarkable',
    'showdown',
    'snarkdown',
    'micromark',
    'markdownit',
] as const

export const BenchmarkResultSchema = z.object({
    duration: z.number(),
    iterations: z.number(),
    output: z.string(),
    outputSize: z.number(),
    parser: z.enum(parsersList),
    standardDeviation: z.number(),
})

export type BenchmarkResult = z.infer<typeof BenchmarkResultSchema>

const remarkProcessor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)

const remarkableProcessor = new Remarkable({
    html: true,
})

const showdownConverter = new showdown.Converter({
    strikethrough: true,
    tables: true,
})

async function runParser(
    parserFn: () => Promise<string> | string,
): Promise<{ duration: number; output: string }> {
    const start = performance.now()
    const output = await parserFn()
    const duration = performance.now() - start

    return { duration, output }
}

function calculateStandardDeviation(values: number[]): number {
    const mean = values.reduce((a, b) => a + b, 0) / values.length
    return Math.sqrt(
        values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length,
    )
}

async function getMarkdownFileContent(filePath: string): Promise<string> {
    try {
        return fs.readFileSync(filePath, 'utf-8')
    } catch (error) {
        console.error('Error reading markdown file:', error)
        throw new Error('Failed to read the markdown file.')
    }
}

async function benchmarkParsers(markdown: string): Promise<BenchmarkResult[]> {
    const parsers = [
        { fn: () => marked(markdown), name: 'marked' },
        { fn: () => remarkableProcessor.render(markdown), name: 'remarkable' },
        {
            fn: () =>
                micromark(markdown, {
                    extensions: [gfmTable(), gfmStrikethrough()],
                    htmlExtensions: [gfmTableHtml(), gfmStrikethroughHtml()],
                }),
            name: 'micromark',
        },
        { fn: () => showdownConverter.makeHtml(markdown), name: 'showdown' },
        {
            fn: async () => String(await remarkProcessor.process(markdown)),
            name: 'remark-parse',
        },
        { fn: () => snarkdown(markdown), name: 'snarkdown' },
    ]

    const results = await Promise.all(
        parsers.map(async (parser) => {
            for (let i = 0; i < WARM_UP_ITERATIONS; i++) await parser.fn()

            const durations: number[] = []
            let lastOutput = ''

            for (let i = 0; i < NUM_ITERATIONS; i++) {
                const { duration, output } = await runParser(parser.fn)
                durations.push(duration)
                lastOutput = output
            }

            return {
                duration: durations.reduce((a, b) => a + b) / NUM_ITERATIONS,
                iterations: NUM_ITERATIONS,
                output: lastOutput,
                outputSize: lastOutput.length,
                parser: parser.name,
                standardDeviation: calculateStandardDeviation(durations),
            }
        }),
    )

    return results.sort((a, b) => a.duration - b.duration) as BenchmarkResult[]
}

export async function runBenchmark(
    filePath = 'src/lib/markdown.md',
): Promise<BenchmarkResult[]> {
    const markdown = await getMarkdownFileContent(filePath)
    return benchmarkParsers(markdown)
}
