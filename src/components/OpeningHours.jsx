export default function OpeningHours ({ day = '', openingTime = '', closingTime = '' }) {
  return (
    <li key={day} className="flex">
      <span className="mr-8 w-24">{day}</span>
      <span> {openingTime} – {closingTime}</span>
    </li>
  )
}