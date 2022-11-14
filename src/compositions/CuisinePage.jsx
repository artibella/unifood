import { Composition, Slot } from "@uniformdev/canvas-react";
import Head from "next/head";
import appRenderer from "./appRenderer";

export default function CuisinePage({ composition }) {
  const placeHolder = (
    <div className="h-96"></div>
  )
  return (
    <>
      <Head>
        <title>{composition?._name}</title>
      </Head>
      <div>
        <Composition data={composition} resolveRenderer={appRenderer}>
          <section>
            <Slot name="hero" emptyPlaceholder={placeHolder} />
          </section>
          <section>
            <Slot name="sections" emptyPlaceholder={placeHolder} />
          </section>
        </Composition>
      </div>
    </>
  )
}