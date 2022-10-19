import { Slot } from "@uniformdev/canvas-react";
import Grid from "./Grid";

export default function GridContainer({ columns }) {

  return (
    <Grid columns={columns}>
      <Slot name="items" />
    </Grid>
  )
}
