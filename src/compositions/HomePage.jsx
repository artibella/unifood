import { Composition, Slot } from "@uniformdev/canvas-react";
import Head from "next/head";
import appRenderer from "./appRenderer";

export default function HomePage({ composition }) {
  return (
    <>
      <Head>
        <title>{composition?._name}</title>
      </Head>
      <div>
        <Composition data={composition} resolveRenderer={appRenderer}>
          {({ title }) => (
            <div className="container mx-auto px-16">
              <Slot name="mainNavigation" />

              <section>
                <h1 className="text-8xl font-bold text-center mb-16">{title}</h1>
                {/* add slot component */}
                <Slot name="mainHero" />
              </section>

              <section>
                <Slot name="sections" />
              </section>
            </div>
          )}
        </Composition>
      </div>
    </>
  )
}