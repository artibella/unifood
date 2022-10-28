import { Slot } from "@uniformdev/canvas-react";

export default function HowtoDetail({title='', intro='', body=''}) {
  return (
    <div className="container mx-auto px-16">
      <div className="howto-hero mb-8">
        <Slot name="hero" />
      </div>

      { intro ? (
        <div className="howto-intro mb-8">
          <div className="prose text-xl" 
            dangerouslySetInnerHTML={{__html: intro}}>
          </div>
        </div>
      ) : ''}

    { body ? (
        <div className="howto-body mb-8">
          <div className="prose" 
            dangerouslySetInnerHTML={{__html: body}}>
          </div>
        </div>
      ) : ''}

      <div className="howto-sections">
        <Slot name="sections" />
      </div>
    </div>
  )
}