import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "./ui/card"
  import { Badge } from "./ui/badge"
  
  const movies = [
    {
      title: "Inception",
      year: 2010,
      genre: "Sci-Fi",
      director: "Christopher Nolan",
      poster: "/placeholder.svg?height=400&width=300",
    },
    {
      title: "The Shawshank Redemption",
      year: 1994,
      genre: "Drama",
      director: "Frank Darabont",
      poster: "/placeholder.svg?height=400&width=300",
    },
    {
      title: "Pulp Fiction",
      year: 1994,
      genre: "Crime",
      director: "Quentin Tarantino",
      poster: "/placeholder.svg?height=400&width=300",
    },
    {
      title: "The Dark Knight",
      year: 2008,
      genre: "Action",
      director: "Christopher Nolan",
      poster: "/placeholder.svg?height=400&width=300",
    },
    {
      title: "Inception",
      year: 2010,
      genre: "Sci-Fi",
      director: "Christopher Nolan",
      poster: "/placeholder.svg?height=400&width=300",
    },
    {
      title: "The Shawshank Redemption",
      year: 1994,
      genre: "Drama",
      director: "Frank Darabont",
      poster: "/placeholder.svg?height=400&width=300",
    },
    {
      title: "Pulp Fiction",
      year: 1994,
      genre: "Crime",
      director: "Quentin Tarantino",
      poster: "/placeholder.svg?height=400&width=300",
    },
    {
      title: "The Dark Knight",
      year: 2008,
      genre: "Action",
      director: "Christopher Nolan",
      poster: "/placeholder.svg?height=400&width=300",
    },
    {
      title: "Inception",
      year: 2010,
      genre: "Sci-Fi",
      director: "Christopher Nolan",
      poster: "/placeholder.svg?height=400&width=300",
    },
    {
      title: "The Shawshank Redemption",
      year: 1994,
      genre: "Drama",
      director: "Frank Darabont",
      poster: "/placeholder.svg?height=400&width=300",
    },
    {
      title: "Pulp Fiction",
      year: 1994,
      genre: "Crime",
      director: "Quentin Tarantino",
      poster: "/placeholder.svg?height=400&width=300",
    },
    {
      title: "The Dark Knight",
      year: 2008,
      genre: "Action",
      director: "Christopher Nolan",
      poster: "/placeholder.svg?height=400&width=300",
    },{
      title: "Inception",
      year: 2010,
      genre: "Sci-Fi",
      director: "Christopher Nolan",
      poster: "/placeholder.svg?height=400&width=300",
    },
    {
      title: "The Shawshank Redemption",
      year: 1994,
      genre: "Drama",
      director: "Frank Darabont",
      poster: "/placeholder.svg?height=400&width=300",
    },
    {
      title: "Pulp Fiction",
      year: 1994,
      genre: "Crime",
      director: "Quentin Tarantino",
      poster: "/placeholder.svg?height=400&width=300",
    },
    {
      title: "The Dark Knight",
      year: 2008,
      genre: "Action",
      director: "Christopher Nolan",
      poster: "/placeholder.svg?height=400&width=300",
    },{
      title: "Inception",
      year: 2010,
      genre: "Sci-Fi",
      director: "Christopher Nolan",
      poster: "/placeholder.svg?height=400&width=300",
    },
    {
      title: "The Shawshank Redemption",
      year: 1994,
      genre: "Drama",
      director: "Frank Darabont",
      poster: "/placeholder.svg?height=400&width=300",
    },
    {
      title: "Pulp Fiction",
      year: 1994,
      genre: "Crime",
      director: "Quentin Tarantino",
      poster: "/placeholder.svg?height=400&width=300",
    },
    {
      title: "The Dark Knight",
      year: 2008,
      genre: "Action",
      director: "Christopher Nolan",
      poster: "/placeholder.svg?height=400&width=300",
    },
  ]
  
  export function MovieList() {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movies.map((movie) => (
          <Card key={movie.title} className="overflow-hidden">
            <img
              src={movie.poster}
              alt={`${movie.title} poster`}
              className="w-full h-[400px] object-cover"
            />
            <CardHeader>
              <CardTitle>{movie.title}</CardTitle>
              <CardDescription>{movie.year}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge>{movie.genre}</Badge>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Directed by {movie.director}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }
  
  