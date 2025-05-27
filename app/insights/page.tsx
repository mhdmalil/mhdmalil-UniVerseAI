"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, BookOpen, Award, Plus, Save } from "lucide-react"

interface Course {
  id: string
  name: string
  grade: string
  credits: number
  gpa: number
}

export default function InsightsPage() {
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "Calculus I", grade: "A", credits: 4, gpa: 4.0 },
    { id: "2", name: "Physics", grade: "B+", credits: 3, gpa: 3.3 },
    { id: "3", name: "Chemistry", grade: "A-", credits: 4, gpa: 3.7 },
    { id: "4", name: "English", grade: "B", credits: 3, gpa: 3.0 },
  ])

  const [newCourse, setNewCourse] = useState({ name: "", grade: "", credits: 0 })
  const [goal, setGoal] = useState({ target: "", timeline: "" })

  const gradeToGPA = (grade: string): number => {
    const gradeMap: { [key: string]: number } = {
      "A+": 4.0,
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      "D+": 1.3,
      D: 1.0,
      F: 0.0,
    }
    return gradeMap[grade] || 0.0
  }

  const calculateGPA = () => {
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0)
    const totalPoints = courses.reduce((sum, course) => sum + course.gpa * course.credits, 0)
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00"
  }

  const addCourse = () => {
    if (newCourse.name && newCourse.grade && newCourse.credits > 0) {
      const course: Course = {
        id: Date.now().toString(),
        name: newCourse.name,
        grade: newCourse.grade,
        credits: newCourse.credits,
        gpa: gradeToGPA(newCourse.grade),
      }
      setCourses([...courses, course])
      setNewCourse({ name: "", grade: "", credits: 0 })
      console.log("Course added:", course.name)
    }
  }

  const savePlan = () => {
    if (goal.target && goal.timeline) {
      console.log("Plan saved:", goal)
    }
  }

  const currentGPA = Number.parseFloat(calculateGPA())
  const gpaProgress = (currentGPA / 4.0) * 100

  const suggestions = [
    "Focus 2 hours daily on Math to improve understanding",
    "Join study groups for Physics - collaboration helps",
    "Use active recall techniques for Chemistry memorization",
    "Practice writing essays to improve English grades",
  ]

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Academic Insights</h1>
          <p className="text-muted-foreground">Track your progress and get AI-powered improvement suggestions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* GPA Overview */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Current GPA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold">{calculateGPA()}</div>
                <p className="text-muted-foreground">out of 4.0</p>
              </div>
              <Progress value={gpaProgress} className="w-full" />
              <div className="text-sm text-center text-muted-foreground">{gpaProgress.toFixed(1)}% of maximum GPA</div>
            </CardContent>
          </Card>

          {/* Add Course Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Add Course Grade</CardTitle>
              <CardDescription>Input your course grades to calculate GPA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="course-name">Course Name</Label>
                  <Input
                    id="course-name"
                    placeholder="e.g., Calculus I"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="grade">Grade</Label>
                  <Input
                    id="grade"
                    placeholder="e.g., A, B+, C"
                    value={newCourse.grade}
                    onChange={(e) => setNewCourse({ ...newCourse, grade: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="credits">Credits</Label>
                  <Input
                    id="credits"
                    type="number"
                    placeholder="3"
                    value={newCourse.credits || ""}
                    onChange={(e) => setNewCourse({ ...newCourse, credits: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addCourse} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Table */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Course Grades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Course</th>
                    <th className="text-left p-2">Grade</th>
                    <th className="text-left p-2">Credits</th>
                    <th className="text-left p-2">GPA Points</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id} className="border-b">
                      <td className="p-2 font-medium">{course.name}</td>
                      <td className="p-2">
                        <Badge variant="outline">{course.grade}</Badge>
                      </td>
                      <td className="p-2">{course.credits}</td>
                      <td className="p-2">{course.gpa.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                AI Improvement Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm">{suggestion}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Goal Setting */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Set Academic Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="goal-target">Goal</Label>
                <Input
                  id="goal-target"
                  placeholder="e.g., Achieve 3.8 GPA"
                  value={goal.target}
                  onChange={(e) => setGoal({ ...goal, target: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="timeline">Timeline</Label>
                <Input
                  id="timeline"
                  placeholder="e.g., End of semester"
                  value={goal.timeline}
                  onChange={(e) => setGoal({ ...goal, timeline: e.target.value })}
                />
              </div>
              <Button onClick={savePlan} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Plan
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Progress Chart Placeholder */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>GPA Progress Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">GPA trend chart will appear here</p>
                <p className="text-sm text-gray-400">Add more semester data to see progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
