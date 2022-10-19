import { Slot } from "@uniformdev/canvas-react";

export default function SectionContainer({ title }) {

  return (
    <Section title={title}>
      <Slot name="content" />
    </Section>
  )
}
