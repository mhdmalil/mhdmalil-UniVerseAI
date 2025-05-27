"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Plus, CalendarIcon, Clock, Edit, Bell } from "lucide-react"

interface Task {
  id: string
  title: string
  dueDate: string
  completed: boolean
  priority: "high" | "medium" | "low"
}

interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  type: "class" | "exam" | "assignment"
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Math Assignment Chapter 5", dueDate: "2024-01-15", completed: false, priority: "high" },
    { id: "2", title: "History Essay Draft", dueDate: "2024-01-18", completed: false, priority: "medium" },
    { id: "3", title: "Science Lab Report", dueDate: "2024-01-20", completed: true, priority: "low" },
  ])

  const [calendarEvents] = useState<CalendarEvent[]>([
    { id: "1", title: "Calculus Lecture", date: "2024-01-15", time: "09:00", type: "class" },
    { id: "2", title: "Physics Midterm", date: "2024-01-17", time: "14:00", type: "exam" },
    { id: "3", title: "Chemistry Lab", date: "2024-01-19", time: "10:00", type: "class" },
  ])

  const [newTask, setNewTask] = useState({ title: "", dueDate: "" })
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const addTask = () => {
    if (newTask.title && newTask.dueDate) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        dueDate: newTask.dueDate,
        completed: false,
        priority: "medium",
      }
      setTasks([...tasks, task])
      setNewTask({ title: "", dueDate: "" })
      console.log("Task added:", task.title)
    }
  }

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const setReminder = (taskId: string) => {
    console.log("Reminder set for task:", taskId)
  }

  const editTask = (taskId: string) => {
    console.log("Editing task:", taskId)
  }

  const setNotification = (eventId: string) => {
    console.log("Notification set for event:", eventId)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "class":
        return "bg-blue-500"
      case "exam":
        return "bg-red-500"
      case "assignment":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Task & Schedule</h1>
          <p className="text-muted-foreground">Manage your tasks and academic calendar</p>
        </div>

        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-6">
            {/* Add Task Section */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Task</CardTitle>
                <CardDescription>Create a new task with due date and AI reminders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="task-title">Task Title</Label>
                    <Input
                      id="task-title"
                      placeholder="Enter task description"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="due-date">Due Date</Label>
                    <Input
                      id="due-date"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={addTask} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </CardContent>
            </Card>

            {/* Tasks List */}
            <Card>
              <CardHeader>
                <CardTitle>Your Tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                          {task.title}
                        </span>
                        <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setReminder(task.id)}>
                        <Bell className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => editTask(task.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar Widget */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              {/* Events List */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Your classes, exams, and assignments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {calendarEvents.map((event) => (
                    <div key={event.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className={`w-4 h-4 rounded-full ${getEventTypeColor(event.type)}`} />
                      <div className="flex-1">
                        <div className="font-medium">{event.title}</div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {event.type}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={() => setNotification(event.id)}>
                        <Bell className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
