import Link from "next/link";
import { Fragment } from "react";

const renderPrimaryCta = ({ title, link }) => {
  return (
    <div className="rounded-md shadow">
      <Link href={link}>
        <a
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
        >
          {title}
        </a>
      </Link>
    </div>
  )
}

const renderSecondaryCta = ({ title, link }) => {
  return (
    <div className="mt-3 sm:mt-0 sm:ml-3">
      <Link href={link}>
        <a
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg"
        >
          {title}
        </a>
      </Link>
    </div>
  )
}

const renderCtas = (ctas) => {
  return (
    <>
      {ctas && ctas.length ? (
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          {ctas.map((cta, index) => {
            return index === 0 ? renderPrimaryCta(cta) : renderSecondaryCta(cta)
          })}

        </div>
      ) : <Fragment />
      }
    </>
  )
}

const renderImage = (imageUrl, title) => {
  return (
    <>
      {imageUrl && imageUrl.length ? (

        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
            src={imageUrl}
            alt={title}
          />
        </div>

      ) : <Fragment />
      }
    </>
  )
}


export default function GenericHero({ title, body, imageUrl, ctas }) {
  const ctaComponents = renderCtas(ctas);
  const image = renderImage(imageUrl, title);

  return (

    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">

          <div className="mx-auto mt-10 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">

            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold font-serif tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                {title}
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                {body}
              </p>
              {ctaComponents}
            </div>
          </div>
        </div>
        {image}
      </div>

    </div>
  );
}
