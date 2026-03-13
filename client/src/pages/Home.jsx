import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination.jsx'
import Testimonial from '../components/Testimonial.jsx'
import NewsLetter from "../components/NewsLetter.jsx"
import RecommendedHotels from '../components/RecommendedHotels.jsx'
import ExclusiveOffers from '../components/ExclusiveOffers.jsx'

function Home() {
  return (
    <>
      <Hero />
      <RecommendedHotels />
      <FeaturedDestination />
      <ExclusiveOffers />
      <Testimonial />
      <NewsLetter />
    </>
  )
}

export default Home
