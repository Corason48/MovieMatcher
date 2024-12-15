import { useState, useEffect } from "react";
import { MovieList } from "../components/MoviesList";

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState([]);
setRecommendations([localStorage.getItem('naee')])
  // Assuming you're passing the recommendations to this page, either via a global state (like context) or by fetching here
 
 // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Movie Recommendations</h1>
      <p className="text-muted-foreground mb-8 text-center">
        Based on your preferences, we think you'll love these movies:
      </p>

      <MovieList
        moviesNames={recommendations} // Dynamic recommendations data
        genre="Sci-Fi" // You can pass the genre as well if needed
      />
    </div>
  );
}
