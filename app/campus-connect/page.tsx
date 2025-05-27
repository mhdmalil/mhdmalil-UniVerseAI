"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Users, GraduationCap, Send, Plus, Star, MapPin, Clock } from "lucide-react"

interface Message {
  id: string
  user: string
  content: string
  timestamp: string
}

interface Group {
  id: string
  name: string
  description: string
  members: number
  subject: string
}

interface Tutor {
  id: string
  name: string
  subject: string
  rating: number
  price: string
  location: string
  availability: string
}

export default function CampusConnectPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", user: "Sarah", content: "Anyone studying for the calculus midterm?", timestamp: "10:30 AM" },
    { id: "2", user: "Mike", content: "Yes! Want to form a study group?", timestamp: "10:32 AM" },
    { id: "3", user: "Emma", content: "Count me in! Library at 3 PM?", timestamp: "10:35 AM" },
  ])

  const [groups] = useState<Group[]>([
    {
      id: "1",
      name: "Calculus Study Group",
      description: "Weekly study sessions for Calc I & II",
      members: 12,
      subject: "Mathematics",
    },
    {
      id: "2",
      name: "Physics Lab Partners",
      description: "Find lab partners and discuss experiments",
      members: 8,
      subject: "Physics",
    },
    {
      id: "3",
      name: "CS Project Collaboration",
      description: "Team up for computer science projects",
      members: 15,
      subject: "Computer Science",
    },
    {
      id: "4",
      name: "Pre-Med Study Circle",
      description: "MCAT prep and medical school discussions",
      members: 20,
      subject: "Medicine",
    },
  ])

  const [tutors] = useState<Tutor[]>([
    {
      id: "1",
      name: "Dr. Johnson",
      subject: "Mathematics",
      rating: 4.9,
      price: "$25/hr",
      location: "Campus Library",
      availability: "Mon-Fri 2-6 PM",
    },
    {
      id: "2",
      name: "Alex Chen",
      subject: "Computer Science",
      rating: 4.8,
      price: "$30/hr",
      location: "Online",
      availability: "Evenings & Weekends",
    },
    {
      id: "3",
      name: "Maria Rodriguez",
      subject: "Chemistry",
      rating: 4.7,
      price: "$20/hr",
      location: "Science Building",
      availability: "Tue-Thu 1-5 PM",
    },
    {
      id: "4",
      name: "David Kim",
      subject: "Physics",
      rating: 4.9,
      price: "$28/hr",
      location: "Physics Lab",
      availability: "Mon-Wed 3-7 PM",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [newGroup, setNewGroup] = useState({ name: "", description: "" })
  const [newPost, setNewPost] = useState("")

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        user: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const joinGroup = (groupId: string) => {
    console.log("Joined group:", groupId)
  }

  const createGroup = () => {
    if (newGroup.name && newGroup.description) {
      console.log("Group created:", newGroup)
      setNewGroup({ name: "", description: "" })
    }
  }

  const contactTutor = (tutorId: string) => {
    console.log("Contacting tutor:", tutorId)
  }

  const createPost = () => {
    if (newPost.trim()) {
      console.log("Post created:", newPost)
      setNewPost("")
    }
  }

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Campus Connect</h1>
          <p className="text-muted-foreground">Connect with peers, join study groups, and find tutors</p>
        </div>

        <Tabs defaultValue="chat" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat">Public Chat</TabsTrigger>
            <TabsTrigger value="groups">Study Groups</TabsTrigger>
            <TabsTrigger value="tutors">Tutors</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Campus Chat
                </CardTitle>
                <CardDescription>Connect with students across campus</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80 mb-4 p-4 border rounded-lg">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{message.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-sm">{message.user}</span>
                            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                          </div>
                          <p className="text-sm mt-1">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Create Post */}
            <Card>
              <CardHeader>
                <CardTitle>Share with Campus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What's on your mind? Share study tips, ask questions, or start discussions..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                <Button onClick={createPost} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Post
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="groups" className="space-y-6">
            {/* Create Group */}
            <Card>
              <CardHeader>
                <CardTitle>Create Study Group</CardTitle>
                <CardDescription>Start a new study group for your subject</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="group-name">Group Name</Label>
                    <Input
                      id="group-name"
                      placeholder="e.g., Advanced Physics Study Group"
                      value={newGroup.name}
                      onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="group-description">Description</Label>
                    <Input
                      id="group-description"
                      placeholder="Brief description of the group"
                      value={newGroup.description}
                      onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={createGroup} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Group
                </Button>
              </CardContent>
            </Card>

            {/* Groups List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {groups.map((group) => (
                <Card key={group.id} className="transition-all duration-200 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{group.members} members</span>
                        </div>
                        <Badge variant="outline">{group.subject}</Badge>
                      </div>
                    </div>
                    <Button onClick={() => joinGroup(group.id)} className="w-full">
                      Join Group
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tutors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutors.map((tutor) => (
                <Card key={tutor.id} className="transition-all duration-200 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{tutor.name}</CardTitle>
                        <CardDescription>{tutor.subject}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{tutor.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{tutor.price}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{tutor.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{tutor.availability}</span>
                      </div>
                    </div>
                    <Button onClick={() => contactTutor(tutor.id)} className="w-full">
                      Contact Tutor
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
