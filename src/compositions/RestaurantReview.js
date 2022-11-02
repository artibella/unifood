import { Composition, Slot } from "@uniformdev/canvas-react";
import Head from "next/head";
import appRenderer from "./appRenderer";

export default function RestaurantReview({composition}) {
  return (
    <>
      <Head>
        <title>{composition.parameters.title?.value}</title>
      </Head>
      <Composition data={composition} resolveRenderer={appRenderer}>
        {({ title }) => (

          <div className="container mx-auto px-16">
            <section>
              <Slot name="hero" />
            </section>
            <section>
              <div className="my-8">
                <Slot name="authors" />
              </div>
            </section>
            <section className="lg:grid lg:grid-cols-3 lg:gap-4">
              <div className="review lg:col-span-2">
                <Slot name="review" />
              </div>
              <aside className="restaurant">
                <Slot name="restaurantDetails" />
              </aside>
            </section>
          </div>
        )}
      </Composition>
    </>
  )
}