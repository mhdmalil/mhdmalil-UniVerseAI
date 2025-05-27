"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Play, Download, ChevronLeft, ChevronRight, CheckCircle, XCircle } from "lucide-react"

const mockLessons = [
  {
    id: 1,
    title: "Introduction to Algebra",
    content: "Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols...",
    quiz: {
      question: "What is the value of x in the equation 2x + 5 = 11?",
      options: ["x = 2", "x = 3", "x = 4", "x = 5"],
      correct: 1,
    },
  },
  {
    id: 2,
    title: "Linear Equations",
    content:
      "A linear equation is an algebraic equation in which each term is either a constant or the product of a constant and a single variable...",
    quiz: {
      question: "Which of the following is a linear equation?",
      options: ["y = x²", "y = 2x + 3", "y = x³", "y = √x"],
      correct: 1,
    },
  },
]

export default function LearnHubPage() {
  const [selectedSubject, setSelectedSubject] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [summary, setSummary] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [currentLesson, setCurrentLesson] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const generateSummary = () => {
    if (uploadedFile && selectedSubject) {
      setSummary(
        `Summary of ${uploadedFile.name}: This is a comprehensive overview of ${selectedSubject} concepts. The document covers fundamental principles, key formulas, and practical applications. Students will learn essential problem-solving techniques and theoretical foundations.`,
      )
    }
  }

  const playAudio = () => {
    console.log("Playing audio summary")
  }

  const downloadAudio = () => {
    console.log("Downloading audio file")
  }

  const submitQuiz = () => {
    setShowResult(true)
  }

  const nextLesson = () => {
    if (currentLesson < mockLessons.length - 1) {
      setCurrentLesson(currentLesson + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Learn Hub</h1>
          <p className="text-muted-foreground">Upload your study materials and get AI-powered summaries and lessons</p>
        </div>

        {/* Upload Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upload Study Material</CardTitle>
            <CardDescription>Upload PDF, PPT, or Word documents to generate AI summaries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subject">Select Subject</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="file">Upload File</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.ppt,.pptx,.doc,.docx"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
              </div>
            </div>

            {uploadedFile && (
              <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <FileText className="h-5 w-5 text-blue-500" />
                <span className="text-sm">{uploadedFile.name}</span>
                <Badge variant="secondary">{selectedSubject}</Badge>
              </div>
            )}

            <Button onClick={generateSummary} disabled={!uploadedFile || !selectedSubject} className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Generate Summary
            </Button>
          </CardContent>
        </Card>

        {/* Summary Section */}
        {summary && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>AI-Generated Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-32 mb-4">
                <p className="text-sm">{summary}</p>
              </ScrollArea>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={playAudio}>
                  <Play className="mr-2 h-4 w-4" />
                  Play Audio
                </Button>
                <Button variant="outline" onClick={downloadAudio}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Audio
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Topic Selection */}
        {summary && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Select Learning Topic</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a topic to explore" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="algebra">Algebra Fundamentals</SelectItem>
                  <SelectItem value="geometry">Geometry Basics</SelectItem>
                  <SelectItem value="calculus">Introduction to Calculus</SelectItem>
                  <SelectItem value="statistics">Statistics Overview</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {/* Lessons Section */}
        {selectedTopic && (
          <Card>
            <CardHeader>
              <CardTitle>Interactive Lessons</CardTitle>
              <div className="flex items-center justify-between">
                <Badge variant="outline">
                  Lesson {currentLesson + 1} of {mockLessons.length}
                </Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={prevLesson} disabled={currentLesson === 0}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextLesson}
                    disabled={currentLesson === mockLessons.length - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Lesson Content */}
              <div>
                <h3 className="text-xl font-semibold mb-3">{mockLessons[currentLesson].title}</h3>
                <p className="text-muted-foreground mb-4">{mockLessons[currentLesson].content}</p>
              </div>

              {/* Quiz Section */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold mb-3">Quick Quiz</h4>
                <p className="mb-4">{mockLessons[currentLesson].quiz.question}</p>

                <div className="space-y-2 mb-4">
                  {mockLessons[currentLesson].quiz.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === index ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedAnswer(index)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {!showResult ? (
                  <Button onClick={submitQuiz} disabled={selectedAnswer === null}>
                    Submit Answer
                  </Button>
                ) : (
                  <div className="flex items-center space-x-2">
                    {selectedAnswer === mockLessons[currentLesson].quiz.correct ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-green-500 font-medium">Correct! Well done.</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="text-red-500 font-medium">
                          Incorrect. The correct answer is:{" "}
                          {mockLessons[currentLesson].quiz.options[mockLessons[currentLesson].quiz.correct]}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
