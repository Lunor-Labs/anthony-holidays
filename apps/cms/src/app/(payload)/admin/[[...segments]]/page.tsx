import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import configPromise from '@payload-config'
import type { Metadata } from 'next'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

import { importMap } from '../importMap'

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({
    config: configPromise,
    params,
    searchParams,
  })

const Page = ({ params, searchParams }: Args) =>
  RootPage({
    config: configPromise,
    importMap,
    params,
    searchParams,
  })

export default Page
