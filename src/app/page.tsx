import { redirect } from 'next/navigation'

export default function HomePage() {
  // Redirect home page to auctions (main functionality)
  redirect('/auctions')
}