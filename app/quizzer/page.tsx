"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FileText, Brain, CheckCircle, XCircle, RotateCcw, Save } from "lucide-react"

const mockQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2,
    explanation: "Paris is the capital and largest city of France.",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1,
    explanation: "Mars is called the Red Planet due to its reddish appearance from iron oxide on its surface.",
  },
  {
    id: 3,
    question: "What is 15 × 8?",
    options: ["110", "120", "130", "140"],
    correct: 1,
    explanation: "15 × 8 = 120",
  },
]

export default function QuizzerPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [quizGenerated, setQuizGenerated] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const generateQuiz = () => {
    if (uploadedFile) {
      setQuizGenerated(true)
      setCurrentQuestion(0)
      setSelectedAnswers([])
      setShowResults(false)
      setQuizCompleted(false)
      console.log(`Generating quiz from ${uploadedFile.name}`)
    }
  }

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const submitAnswer = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
      setShowResults(true)
    }
  }

  const retakeQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
    setQuizCompleted(false)
  }

  const saveResults = () => {
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === mockQuestions[index].correct ? 1 : 0)
    }, 0)
    console.log(`Saving quiz results: ${score}/${mockQuestions.length}`)
  }

  const calculateScore = () => {
    return selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === mockQuestions[index].correct ? 1 : 0)
    }, 0)
  }

  if (showResults) {
    const score = calculateScore()
    const percentage = Math.round((score / mockQuestions.length) * 100)

    return (
      <div className="p-6 bg-background min-h-screen">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Quiz Results</CardTitle>
              <CardDescription>Here's how you performed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                  {score}/{mockQuestions.length}
                </div>
                <div className="text-xl text-muted-foreground mb-4">{percentage}% Score</div>
                <Progress value={percentage} className="w-full max-w-md mx-auto" />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Question Review</h3>
                {mockQuestions.map((question, index) => (
                  <Card key={question.id} className="p-4">
                    <div className="flex items-start space-x-3">
                      {selectedAnswers[index] === question.correct ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-1" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium mb-2">{question.question}</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          Your answer: {question.options[selectedAnswers[index]]}
                        </p>
                        {selectedAnswers[index] !== question.correct && (
                          <p className="text-sm text-green-600 mb-2">
                            Correct answer: {question.options[question.correct]}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">{question.explanation}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={retakeQuiz} variant="outline">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Quiz
                </Button>
                <Button onClick={saveResults}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Quizzer</h1>
          <p className="text-muted-foreground">Upload your study materials to generate custom quizzes</p>
        </div>

        {!quizGenerated ? (
          <Card>
            <CardHeader>
              <CardTitle>Generate Quiz</CardTitle>
              <CardDescription>Upload a document to create personalized quiz questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="quiz-file">Upload Study Material</Label>
                <Input
                  id="quiz-file"
                  type="file"
                  accept=".pdf,.ppt,.pptx,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
              </div>

              {uploadedFile && (
                <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <span className="text-sm">{uploadedFile.name}</span>
                  <Badge variant="secondary">Ready to process</Badge>
                </div>
              )}

              <Button onClick={generateQuiz} disabled={!uploadedFile} className="w-full">
                <Brain className="mr-2 h-4 w-4" />
                Generate Quiz
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Quiz Question {currentQuestion + 1}</span>
                <Badge variant="outline">
                  {currentQuestion + 1} of {mockQuestions.length}
                </Badge>
              </CardTitle>
              <Progress value={((currentQuestion + 1) / mockQuestions.length) * 100} />
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">{mockQuestions[currentQuestion].question}</h3>

                <div className="space-y-2">
                  {mockQuestions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
                      className="w-full justify-start text-left h-auto p-4"
                      onClick={() => selectAnswer(index)}
                    >
                      <span className="mr-3 font-medium">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                <Button onClick={submitAnswer} disabled={selectedAnswers[currentQuestion] === undefined}>
                  {currentQuestion === mockQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
