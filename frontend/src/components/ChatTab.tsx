import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import io, { Socket } from 'socket.io-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
import axios from 'axios';

interface Message {
    _id: string;
    sender: string;
    receiver: string;
    content: string;
    createdAt: string;
}

interface ChatUser {
    _id: string;
    name: string;
    avatar?: string;
}

export function ChatTab() {
    const { user, token } = useAuth();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [matches, setMatches] = useState<ChatUser[]>([]);
    const [selectedMatch, setSelectedMatch] = useState<ChatUser | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initialize Socket and fetch matches
    useEffect(() => {
        if (token) {
            const socketUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
            const newSocket = io(socketUrl, {
                auth: { token }
            });

            newSocket.on('connect', () => {
                console.log('Connected to chat server');
            });

            newSocket.on('receive_message', (message: Message) => {
                setMessages(prev => [...prev, message]);
            });

            newSocket.on('message_sent', (message: Message) => {
                setMessages(prev => [...prev, message]);
            });

            setSocket(newSocket);

            // Fetch matches
            const fetchMatches = async () => {
                try {
                    const response = await axios.get('/api/matches/my-matches');
                    // Flatten the matches structure to get the OTHER user
                    const friends = response.data.map((match: any) => {
                        return match.users.find((u: any) => u._id !== user?._id);
                    });
                    setMatches(friends);
                    if (friends.length > 0) {
                        setSelectedMatch(friends[0]);
                    }
                } catch (error) {
                    console.error('Error fetching matches:', error);
                }
            };

            fetchMatches();

            return () => {
                newSocket.disconnect();
            };
        }
    }, [token, user?._id]);

    // Fetch conversation when selected match changes
    useEffect(() => {
        if (selectedMatch) {
            const fetchMessages = async () => {
                try {
                    const response = await axios.get(`/api/messages/${selectedMatch._id}`);
                    setMessages(response.data);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            };
            fetchMessages();
        }
    }, [selectedMatch]);

    // Scroll to bottom on new message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (socket && newMessage.trim() && selectedMatch) {
            socket.emit('send_message', {
                receiverId: selectedMatch._id,
                content: newMessage
            });
            setNewMessage('');
        }
    };

    if (matches.length === 0) {
        return (
            <Card className="h-[600px] flex items-center justify-center">
                <div className="text-center p-6">
                    <h3 className="text-lg font-semibold mb-2">No Allies Yet</h3>
                    <p className="text-muted-foreground">
                        Complete your profile and find matches to start chatting!
                    </p>
                </div>
            </Card>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
            {/* Matches List */}
            <Card className="md:col-span-1">
                <CardHeader>
                    <CardTitle>Allies</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <ScrollArea className="h-[500px]">
                        {matches.map(match => (
                            <div
                                key={match._id}
                                onClick={() => setSelectedMatch(match)}
                                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-accent transition-colors ${selectedMatch?._id === match._id ? 'bg-accent' : ''
                                    }`}
                            >
                                <Avatar>
                                    <AvatarImage src={match.avatar} />
                                    <AvatarFallback>{match.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="font-medium">{match.name}</div>
                            </div>
                        ))}
                    </ScrollArea>
                </CardContent>
            </Card>

            {/* Chat Area */}
            <Card className="md:col-span-2 flex flex-col">
                <CardHeader className="border-b">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={selectedMatch?.avatar} />
                            <AvatarFallback>{selectedMatch?.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>{selectedMatch?.name}</CardTitle>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                            {messages.map((msg, index) => {
                                const isMe = msg.sender === user?._id;
                                return (
                                    <div
                                        key={index}
                                        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-lg p-3 ${isMe
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted'
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={scrollRef} />
                        </div>
                    </ScrollArea>

                    <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1"
                        />
                        <Button type="submit" size="icon">
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
