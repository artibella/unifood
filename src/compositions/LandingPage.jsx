import { Composition, Slot } from "@uniformdev/canvas-react";
import Head from "next/head";
import appRenderer from "./appRenderer";

export default function LandingPage({ composition }) {
  return (
    <>
      <Head>
        <title>{composition?._name}</title>
      </Head>
      <div>
        <Composition data={composition} resolveRenderer={appRenderer}>
          <section>
            <Slot name="hero" />
          </section>
          <section>
            <Slot name="sections" />
          </section>
        </Composition>
      </div>
    </>
  )
}