import { NextResponse } from 'next/server'
import { PAYLOAD_API_URL } from '@/lib/payload-data'

export const dynamic = 'force-dynamic'

export async function GET() {
  const startedAt = Date.now()
  try {
    const res = await fetch(`${PAYLOAD_API_URL}/api/journeys?limit=1`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    })

    const latencyMs = Date.now() - startedAt

    if (!res.ok) {
      return NextResponse.json(
        {
          status: 'error',
          configuredBackendUrl: PAYLOAD_API_URL,
          httpStatus: res.status,
          statusText: res.statusText,
          latencyMs,
        },
        { status: 502 }
      )
    }

    const data = await res.json()
    return NextResponse.json({
      status: 'connected',
      configuredBackendUrl: PAYLOAD_API_URL,
      latencyMs,
      totalJourneys: data?.totalDocs ?? 0,
      firstTourSlug: data?.docs?.[0]?.slug ?? null,
      environment: process.env.NODE_ENV,
    })
  } catch (err: any) {
    return NextResponse.json(
      {
        status: 'connection_failed',
        configuredBackendUrl: PAYLOAD_API_URL,
        error: err.message || String(err),
        latencyMs: Date.now() - startedAt,
        environment: process.env.NODE_ENV,
      },
      { status: 500 }
    )
  }
}
