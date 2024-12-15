import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "../hooks/use-toast";

const formSchema = z.object({
  favoriteMovie: z.string().optional(),
  description: z.string().optional(),
  favoriteGenre: z.string().optional(),
});

export function PreferencesForm() {
  const [suggestedMovies, setSuggestedMovies] = useState([]); // For showing suggested movies
  const [recommendations, setRecommendations] = useState([]); // For movie recommendations
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      favoriteMovie: "",
      description: "",
      favoriteGenre: "",
    },
  });

  // Function to handle fetching movie suggestion based on description
  async function handleShowMovie() {
    const description = form.getValues("description");
    if (!description) {
      toast({
        title: "Error",
        description: "Please enter a movie description first.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `http://127.0.0.1:8000/movie_name/${encodeURIComponent(description)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch suggested movie");
      }

      const data = await response.json();
      if (data.title) {
        setSuggestedMovies([data.title]);
      } else {
        setSuggestedMovies([]);
        toast({
          title: "Error",
          description: "No movie suggestions found for the description.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Function to handle saving preferences and fetching movie recommendations
  async function handleSavePreferences() {
    const favoriteMovie = form.getValues("favoriteMovie");
    const favoriteGenre = form.getValues("favoriteGenre");

    if (!favoriteMovie) {
      toast({
        title: "Error",
        description: "Please select a favorite movie first.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          moviesNames: [favoriteMovie],
          genre: favoriteGenre,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      setRecommendations(data.recommendations || []);
      toast({
        title: "Preferences Saved",
        description: "Movie recommendations have been updated.",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Handle selecting a movie from the suggestions
  function handleMovieSelect(movie: string) {
    form.setValue("favoriteMovie", movie);
    setSuggestedMovies([]); // Clear suggestions after selection
  }

  return (
    <div className="space-y-8 max-w-md mx-auto">
      {/* Movie Title Field */}
      <div>
        <label htmlFor="favoriteMovie" className="block text-sm font-medium">
          Favorite Movie
        </label>
        <Input
          id="favoriteMovie"
          placeholder="Type your favorite movie"
          {...form.register("favoriteMovie")}
        />
      </div>

      {/* Movie Description Field */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Movie Description (Optional)
        </label>
        <Input
          id="description"
          placeholder="Describe the movie..."
          {...form.register("description")}
        />
        <Button
          className="mt-2"
          onClick={handleShowMovie}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Show Movie"}
        </Button>
      </div>

      {/* Suggested Movies */}
      {suggestedMovies.length > 0 && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <p className="font-semibold">Suggested Movies:</p>
          <ul>
            {suggestedMovies.map((movie, index) => (
              <li
                key={index}
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={() => handleMovieSelect(movie)}
              >
                {movie}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Save Preferences */}
      <Button
        className="w-full"
        onClick={handleSavePreferences}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save Preferences"}
      </Button>

      {/* Movie Recommendations */}
      {recommendations.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Recommendations:</h3>
          <ul className="list-disc pl-5">
            {recommendations.map((movie, index) => (
              <li key={index}>{movie}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
