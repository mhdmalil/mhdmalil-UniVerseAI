"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, Users, MessageCircle, Clock, BookOpen } from "lucide-react"
import Link from "next/link"

const upcomingTasks = [
  { title: "Math Assignment", due: "Tomorrow", priority: "high" },
  { title: "History Essay", due: "Friday", priority: "medium" },
  { title: "Science Lab Report", due: "Next Week", priority: "low" },
]

const recentPosts = [
  { author: "Study Group Alpha", content: "Anyone free for calculus study session tonight?", time: "2h ago" },
  { author: "Campus Tutors", content: "New chemistry tutor available - excellent reviews!", time: "4h ago" },
]

export default function DashboardPage() {
  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Welcome back!</h1>
          <p className="text-muted-foreground">Here's what's happening with your studies today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Quick Stats */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.7</div>
              <p className="text-xs text-muted-foreground">+0.2 from last semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks Due</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Groups</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Active groups</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Next Tasks */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Next Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">Due: {task.due}</p>
                  </div>
                  <Badge
                    variant={
                      task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
              <Link href="/tasks">
                <Button className="w-full" variant="outline">
                  View All Tasks
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* GPA Overview */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                GPA Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold">3.7</div>
                <p className="text-muted-foreground">Current GPA</p>
              </div>
              <Progress value={92.5} className="w-full" />
              <div className="text-sm text-muted-foreground text-center">92.5% of your target (4.0)</div>
              <Link href="/insights">
                <Button className="w-full" variant="outline">
                  View Detailed Insights
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Social Posts */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Campus Connect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPosts.map((post, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                  <p className="text-sm">{post.content}</p>
                </div>
              ))}
              <Link href="/campus-connect">
                <Button className="w-full" variant="outline">
                  Join Campus Connect
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* AI Assistant Shortcut */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              AI Assistant
            </CardTitle>
            <CardDescription>Get instant help with your studies, schedule, or any questions you have.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => {
                console.log("Opening AI Assistant chat")
              }}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Start Chat with AI
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
