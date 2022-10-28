import { Slot } from '@uniformdev/canvas-react';
import Link from 'next/link'
import { Card } from 'react-daisyui';

export default function GenericCard({ title, image, body, link = '#' }) {

  return (
    <Card className='bg-white'>
      <Card.Image
        src={image}
        alt={title}
      />
      <Card.Body>
        <Card.Title tag="h2">
          <Link href={link}>
            <a className="hover:underline">{title}</a>
          </Link>
        </Card.Title>
        <p>{body}</p>
        <Card.Actions>
          <Slot name="actions" />
        </Card.Actions>
      </Card.Body>
    </Card>
  )
}
