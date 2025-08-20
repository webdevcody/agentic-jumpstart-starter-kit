import { Button } from "~/components/ui/button"
import { Link } from "@tanstack/react-router"
import { Play } from "lucide-react"

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-16 sm:py-24">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Build Amazing Apps with{" "}
              <span className="text-primary">TechTube</span>
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl max-w-2xl">
              Start building full-stack React applications with our modern starter kit. 
              Features authentication, database integration, and everything you need to get started.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="text-base">
              <Link to="/sign-up">
                Get Started
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-base">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="h-64 w-64 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-border">
              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Play className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Your App Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}