import type { Metadata } from "next";
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import configPromise from "@payload-config";
import "@payloadcms/next/css";
import React from "react";

export const metadata: Metadata = {
  title: "Anthony Holidays - Content Studio",
  description:
    "Manage Journeys, Destinations, Experiences, Journal, and Enquiries",
};

import { importMap } from "./importMap";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serverFunction = async (args: any) => {
    "use server";
    return handleServerFunctions({
      ...args,
      config: configPromise,
      importMap,
    });
  };

  return (
    <RootLayout
      config={configPromise}
      importMap={importMap}
      serverFunction={serverFunction as any}
    >
      {children}
    </RootLayout>
  );
}
