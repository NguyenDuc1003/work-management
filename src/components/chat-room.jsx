

import React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Smile, Paperclip, Phone, Video, MoreHorizontal, Search } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { ScrollArea } from "./ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

export function ChatRoom() {
  const [selectedRoom, setSelectedRoom] = useState("general")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)

  const chatRooms = [
    {
      id: "general",
      name: "Tổng công ty",
      type: "company",
      members: 45,
      unread: 3,
      lastMessage: "Chúc mọi người một ngày làm việc hiệu quả!",
      lastTime: "10:30",
    },
    {
      id: "tech",
      name: "Phòng Công nghệ",
      type: "department",
      members: 12,
      unread: 0,
      lastMessage: "Code review meeting lúc 2h chiều nhé",
      lastTime: "09:45",
    },
    {
      id: "frontend-team",
      name: "Team Frontend",
      type: "team",
      members: 5,
      unread: 2,
      lastMessage: "UI mới đã ready để test",
      lastTime: "11:15",
    },
    {
      id: "marketing",
      name: "Phòng Marketing",
      type: "department",
      members: 8,
      unread: 0,
      lastMessage: "Campaign Q1 đã được approve",
      lastTime: "08:20",
    },
    {
      id: "project-hrm",
      name: "Dự án HRM",
      type: "project",
      members: 7,
      unread: 1,
      lastMessage: "Database schema đã update",
      lastTime: "12:00",
    },
  ]

  const sampleMessages = [
    {
      id: "1",
      user: { name: "Nguyễn Văn A", avatar: "/placeholder.svg?height=32&width=32" },
      message: "Chào mọi người! Hôm nay có meeting lúc 2h chiều nhé",
      time: "09:30",
      type: "text",
    },
    {
      id: "2",
      user: { name: "Trần Thị B", avatar: "/placeholder.svg?height=32&width=32" },
      message: "Ok anh, em sẽ chuẩn bị slide trước",
      time: "09:32",
      type: "text",
    },
    {
      id: "3",
      user: { name: "Lê Văn C", avatar: "/placeholder.svg?height=32&width=32" },
      message: "Mọi người check email để xem agenda meeting nhé",
      time: "09:35",
      type: "text",
    },
    {
      id: "4",
      user: { name: "Phạm Thị D", avatar: "/placeholder.svg?height=32&width=32" },
      message: "File design đã upload lên drive",
      time: "10:15",
      type: "file",
      fileName: "UI_Design_v2.fig",
    },
    {
      id: "5",
      user: { name: "Hoàng Văn E", avatar: "/placeholder.svg?height=32&width=32" },
      message: "Thanks Phạm! Mình sẽ review và feedback sớm",
      time: "10:18",
      type: "text",
    },
  ]

  useEffect(() => {
    setMessages(sampleMessages)
  }, [selectedRoom])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        user: { name: "Bạn", avatar: "/placeholder.svg?height=32&width=32" },
        message: message.trim(),
        time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        type: "text",
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const getRoomIcon = (type) => {
    switch (type) {
      case "company":
        return "🏢"
      case "department":
        return "🏛️"
      case "team":
        return "👥"
      case "project":
        return "📋"
      default:
        return "💬"
    }
  }

  const selectedRoomData = chatRooms.find((room) => room.id === selectedRoom)

  const onlineUsers = [
    { name: "Nguyễn Văn A", avatar: "/placeholder.svg?height=24&width=24", status: "online" },
    { name: "Trần Thị B", avatar: "/placeholder.svg?height=24&width=24", status: "online" },
    { name: "Lê Văn C", avatar: "/placeholder.svg?height=24&width=24", status: "away" },
    { name: "Phạm Thị D", avatar: "/placeholder.svg?height=24&width=24", status: "online" },
    { name: "Hoàng Văn E", avatar: "/placeholder.svg?height=24&width=24", status: "offline" },
  ]

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-background">
      {/* Sidebar - Chat Rooms */}
      <div className="w-80 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold mb-3">Chat Rooms</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Tìm kiếm phòng chat..." className="pl-10" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {chatRooms.map((room) => (
              <Button
                key={room.id}
                variant={selectedRoom === room.id ? "secondary" : "ghost"}
                className="w-full justify-start h-auto p-3"
                onClick={() => setSelectedRoom(room.id)}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="text-lg">{getRoomIcon(room.type)}</div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{room.name}</span>
                      {room.unread > 0 && (
                        <Badge variant="destructive" className="h-5 w-5 p-0 text-xs flex items-center justify-center">
                          {room.unread}
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{room.lastMessage}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{room.members} thành viên</span>
                      <span className="text-xs text-muted-foreground">{room.lastTime}</span>
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{getRoomIcon(selectedRoomData?.type || "")}</div>
              <div>
                <h3 className="font-semibold">{selectedRoomData?.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedRoomData?.members} thành viên</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="w-4 h-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Thông tin phòng</DropdownMenuItem>
                  <DropdownMenuItem>Tìm kiếm tin nhắn</DropdownMenuItem>
                  <DropdownMenuItem>Cài đặt thông báo</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Rời khỏi phòng</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={msg.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{msg.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{msg.user.name}</span>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  {msg.type === "text" ? (
                    <p className="text-sm">{msg.message}</p>
                  ) : (
                    <div className="flex items-center gap-2 p-2 bg-muted rounded border">
                      <Paperclip className="w-4 h-4" />
                      <span className="text-sm">{msg.fileName}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Paperclip className="w-4 h-4" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Nhập tin nhắn..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pr-10"
              />
              <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                <Smile className="w-4 h-4" />
              </Button>
            </div>
            <Button onClick={sendMessage} disabled={!message.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Online Users */}
      <div className="w-64 border-l border-border">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold mb-3">Thành viên online</h3>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {onlineUsers.map((user, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded hover:bg-muted/50">
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                      user.status === "online"
                        ? "bg-green-500"
                        : user.status === "away"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground capitalize">{user.status}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default ChatRoom
