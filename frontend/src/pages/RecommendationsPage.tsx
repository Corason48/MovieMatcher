import { MovieList } from "../components/MoviesList"

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Movie Recommendations</h1>
      <p className="text-muted-foreground mb-8 text-center">
        Based on your preferences, we think you'll love these movies:
      </p>
      <MovieList />
    </div>
  )
}

