import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { MovieList } from "../components/MoviesList";

import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { useToast } from "../hooks/use-toast"
import { CloudCog } from "lucide-react"

const formSchema = z.object({
  favoriteMovie: z.string().min(2, {
    message: "Favorite movie must be at least 2 characters.",
  }),
  favoriteGenre: z.string({
    required_error: "Please select a favorite genre.",
  }),
  favoriteDecade: z.string({
    required_error: "Please select a favorite decade.",
  }),
})

export function PreferencesForm() {
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      favoriteMovie: "",
      favoriteGenre: "",
      favoriteDecade: "",
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // Ensure `values` is logged and correct
    setIsLoading(true);
  
    try {
      const fetchResult = fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          moviesNames: [values.favoriteMovie],
          genre: '',
        }),
      });
  
      console.log("fetchResult:", fetchResult); // Ensure fetch returns a promise
  
      const response = await fetchResult; // Ensure fetch result is awaited
      console.log("response:", response); // Log the response object
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response data:", errorData);
        toast({
          title: "Error",
          description: errorData.message || "Failed to save preferences.",
          variant: "destructive",
        });
        return;
      }
  
      const responseData = await response.json();
      console.log("response data:", responseData); 
  
      if (responseData.recommendations) {
        console.log("Recommendations received:", responseData.recommendations);
      } else {
        console.log("No recommendations found in the response.");
      }
  
      toast({
        title: "Preferences Saved",
        description: "Your favorite movie has been saved successfully!",
      });
      setRecommendations( responseData.recommendations)
      console.log(recommendations);
      
    } catch (error) {
      setIsLoading(false);
      console.error("Fetch Error:", error);
  
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  }
  
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-md mx-auto">
        <FormField
          control={form.control}
          name="favoriteMovie"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Favorite Movie</FormLabel>
              <FormControl>
                <Input placeholder="The Shawshank Redemption" {...field} />
              </FormControl>
              <FormDescription>
                Enter the title of your all-time favorite movie.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
     
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Saving Preferences..." : "Save Preferences"}
        </Button>

            <div className="container mx-auto py-10">
                      <h1 className="text-3xl font-bold mb-6 text-center">Your Movie Recommendations</h1>
                      <p className="text-muted-foreground mb-8 text-center">
                        Based on your preferences, we think you'll love these movies:
                      </p>

               
            </div>
          
          <MovieList className="w-full "
                  moviesNames={recommendations} // Dynamic recommendations data
                  genre="Sci-Fi" // You can pass the genre as well if needed
                />


      </form>
    </Form>
  )
}

