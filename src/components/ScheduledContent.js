import { Slot } from "@uniformdev/canvas-react";

export default function ScheduledContent({shouldRender}) {

  return (
    <>
      {shouldRender ? (
        <Slot name="content" />
      ): ''
      }
    </>
  )
}
