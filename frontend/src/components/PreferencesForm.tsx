import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Preferences Saved",
        description: "Your movie preferences have been saved successfully!",
      })
      navigate("/recommendations")
    }, 2000)
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
        <FormField
          control={form.control}
          name="favoriteGenre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Favorite Genre</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="action">Action</SelectItem>
                  <SelectItem value="comedy">Comedy</SelectItem>
                  <SelectItem value="drama">Drama</SelectItem>
                  <SelectItem value="scifi">Sci-Fi</SelectItem>
                  <SelectItem value="horror">Horror</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the movie genre you enjoy the most.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="favoriteDecade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Favorite Decade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a decade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1970s">1970s</SelectItem>
                  <SelectItem value="1980s">1980s</SelectItem>
                  <SelectItem value="1990s">1990s</SelectItem>
                  <SelectItem value="2000s">2000s</SelectItem>
                  <SelectItem value="2010s">2010s</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the decade that produced your favorite movies.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Saving Preferences..." : "Save Preferences"}
        </Button>
      </form>
    </Form>
  )
}

