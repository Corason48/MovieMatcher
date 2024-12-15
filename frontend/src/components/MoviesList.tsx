import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Badge } from "./ui/badge"

export function MovieList({ moviesNames, genre }) {
  console.log(moviesNames);
  
  return (
    <div className="grid gap-6 ">
      {moviesNames.map((movieName) => (
        <Card key={movieName} className="overflow-hidden">
          <CardHeader>
            <CardTitle>{movieName}</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge>{genre}</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
