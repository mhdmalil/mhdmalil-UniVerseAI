import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Brain, Calendar, BarChart3, Users, MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

const features = [
  {
    title: "Learn Hub",
    description: "Upload files and get AI-generated summaries with interactive lessons",
    icon: BookOpen,
    href: "/learn-hub",
    color: "bg-blue-500",
  },
  {
    title: "Quizzer",
    description: "Generate custom quizzes from your study materials",
    icon: Brain,
    href: "/quizzer",
    color: "bg-green-500",
  },
  {
    title: "Task & Schedule",
    description: "Organize your tasks and manage your academic calendar",
    icon: Calendar,
    href: "/tasks",
    color: "bg-purple-500",
  },
  {
    title: "Insights",
    description: "Track your GPA and get personalized improvement suggestions",
    icon: BarChart3,
    href: "/insights",
    color: "bg-orange-500",
  },
  {
    title: "Campus Connect",
    description: "Connect with peers, join study groups, and find tutors",
    icon: Users,
    href: "/campus-connect",
    color: "bg-pink-500",
  },
  {
    title: "AI Assistant",
    description: "Get instant help and contextual suggestions anywhere",
    icon: MessageCircle,
    href: "/dashboard",
    color: "bg-indigo-500",
  },
]

export default function FeaturesPage() {
  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Platform Features</h1>
          <p className="text-xl text-muted-foreground">
            Discover all the tools designed to enhance your academic journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="transition-all duration-200 hover:shadow-lg hover:scale-105">
              <CardHeader>
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={feature.href}>
                  <Button className="w-full group">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/dashboard">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
