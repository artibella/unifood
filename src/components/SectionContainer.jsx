import { Slot } from "@uniformdev/canvas-react";
import Section from "./Section";

export default function SectionContainer({ title }) {

  return (
    <Section title={title}>
      <Slot name="content" />
    </Section>
  )
}
