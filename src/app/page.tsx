import { BenchmarkResults } from '@/components/benchmark-results'
import { runBenchmark } from '@/lib/benchmark'

export default async function Page() {
    const result = await runBenchmark()

    return <BenchmarkResults results={result} />
}

export const revalidate = 0
