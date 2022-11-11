import { Slot } from "@uniformdev/canvas-react";


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

      ) : <></>
      }
    </>
  )
}

export default function GenericHero({ title = '', body = '', imageUrl = '' }) {
  const image = renderImage(imageUrl, title);
  const placeHolder = (
    <div className="h-96"></div>
  )

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
              
              <div className="hero-actions sm:inline-flex items-center justify-center gap-4 mt-8 lg:mt-12 text-center lg:text-left">
                <Slot name="ctas" emptyPlaceholder={placeHolder} />
              </div>
            
            </div>
          </div>
        </div>
        {image}
      </div>

    </div>
  );
}
