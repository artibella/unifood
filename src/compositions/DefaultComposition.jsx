import { Composition, Slot } from "@uniformdev/canvas-react";
import Head from "next/head";
import appRenderer from "./appRenderer";

export default function DefaultComposition({ composition }) {
  return (
    <>
      <Head>
        <title>{composition?._name}</title>
      </Head>
      <div>
        <Composition data={composition} resolveRenderer={appRenderer}>
        </Composition>
      </div>
    </>
  )
}