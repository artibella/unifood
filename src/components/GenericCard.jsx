import { Slot } from '@uniformdev/canvas-react';
import Link from 'next/link'
import { Card } from 'react-daisyui';

export default function GenericCard({ title, image, body }) {

  return (
    <Card className='bg-white'>
      <Card.Image
        src={image}
        alt={title}
      />
      <Card.Body>
        <Card.Title tag="h4" className="text-xl">{title}</Card.Title>
        <p>{body}</p>
        <Card.Actions className="mt-8">
          <Slot name="actions" />
        </Card.Actions>
      </Card.Body>
    </Card>
  )
}
