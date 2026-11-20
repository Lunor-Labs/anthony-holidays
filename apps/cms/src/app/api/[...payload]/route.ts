import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'
import configPromise from '@payload-config'

type PayloadRouteArgs = {
  params: Promise<{
    payload: string[]
  }>
}

export const GET = async (req: any, args: PayloadRouteArgs) => {
  return (REST_GET(configPromise) as any)(req, {
    params: args.params.then((p) => ({ slug: p.payload })),
  })
}

export const POST = async (req: any, args: PayloadRouteArgs) => {
  return (REST_POST(configPromise) as any)(req, {
    params: args.params.then((p) => ({ slug: p.payload })),
  })
}

export const DELETE = async (req: any, args: PayloadRouteArgs) => {
  return (REST_DELETE(configPromise) as any)(req, {
    params: args.params.then((p) => ({ slug: p.payload })),
  })
}

export const PATCH = async (req: any, args: PayloadRouteArgs) => {
  return (REST_PATCH(configPromise) as any)(req, {
    params: args.params.then((p) => ({ slug: p.payload })),
  })
}

export const PUT = async (req: any, args: PayloadRouteArgs) => {
  return (REST_PUT(configPromise) as any)(req, {
    params: args.params.then((p) => ({ slug: p.payload })),
  })
}

export const OPTIONS = async (req: any, args: PayloadRouteArgs) => {
  return (REST_OPTIONS(configPromise) as any)(req, {
    params: args.params.then((p) => ({ slug: p.payload })),
  })
}
