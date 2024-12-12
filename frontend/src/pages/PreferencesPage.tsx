import { PreferencesForm } from "../components/PreferencesForm"

export default function PreferencesPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Movie Preferences</h1>
      <p className="text-muted-foreground mb-8 text-center">
        Help us understand your taste in movies so we can provide better recommendations.
      </p>
      <PreferencesForm />
    </div>
  )
}

