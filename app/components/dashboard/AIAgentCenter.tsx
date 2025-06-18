import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Badge } from '~/components/ui/badge';
import { Textarea } from '~/components/ui/textarea';
import {
  Bot,
  PiggyBank,
  Calculator,
  CreditCard,
  Send,
  MessageSquare,
  TrendingUp,
  Target,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  agent?: string;
}

interface Agent {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  status: 'active' | 'thinking' | 'idle';
  lastActive: string;
  specialties: string[];
}

const AI_AGENTS: Agent[] = [
  {
    id: 'budget',
    name: 'Budget Analyzer',
    description:
      'Analyzes spending patterns and recommends budget optimizations',
    icon: Calculator,
    color: 'bg-blue-500',
    status: 'active',
    lastActive: '2 minutes ago',
    specialties: [
      'Expense tracking',
      'Budget optimization',
      'Spending patterns',
    ],
  },
  {
    id: 'savings',
    name: 'Savings Strategist',
    description:
      'Creates personalized savings plans and emergency fund strategies',
    icon: PiggyBank,
    color: 'bg-green-500',
    status: 'thinking',
    lastActive: '5 minutes ago',
    specialties: [
      'Emergency funds',
      'Goal-based saving',
      'Investment planning',
    ],
  },
  {
    id: 'debt',
    name: 'Debt Reducer',
    description: 'Develops optimized debt payoff strategies',
    icon: CreditCard,
    color: 'bg-red-500',
    status: 'idle',
    lastActive: '1 hour ago',
    specialties: [
      'Debt consolidation',
      'Payoff strategies',
      'Interest optimization',
    ],
  },
];

export function AIAgentCenter() {
  const [selectedAgent, setSelectedAgent] = useState<string>('budget');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content:
        "Hello! I'm your Budget Analyzer AI. I've been analyzing your recent spending patterns and found some interesting insights. Would you like me to walk you through the key findings?",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      agent: 'budget',
    },
    {
      id: '2',
      type: 'user',
      content: "Yes, I'd like to see what you found in my spending patterns.",
      timestamp: new Date(Date.now() - 4 * 60 * 1000),
    },
    {
      id: '3',
      type: 'agent',
      content:
        "Great! I noticed you're spending about 35% more on dining out compared to last month. However, your transportation costs have decreased by 20%. Would you like specific recommendations to optimize your food budget while maintaining your lifestyle?",
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
      agent: 'budget',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const currentAgent = AI_AGENTS.find((agent) => agent.id === selectedAgent);
  const agentMessages = messages.filter(
    (msg) => msg.type === 'user' || msg.agent === selectedAgent
  );

  const recentRecommendations = [
    {
      id: '1',
      agent: 'Budget Analyzer',
      priority: 'high',
      title: 'Reduce dining expenses',
      description: 'Switch to meal prep 2 days per week to save $280/month',
      impact: '$280/month savings',
      status: 'pending',
    },
    {
      id: '2',
      agent: 'Savings Strategist',
      priority: 'medium',
      title: 'Automate emergency fund',
      description: 'Set up automatic transfer of $300/month to emergency fund',
      impact: '6-month fund in 18 months',
      status: 'in-progress',
    },
    {
      id: '3',
      agent: 'Debt Reducer',
      priority: 'high',
      title: 'Consolidate credit cards',
      description: 'Combine 3 credit cards to save on interest',
      impact: '$2,400/year savings',
      status: 'pending',
    },
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content:
          'I understand your question. Let me analyze your data and provide you with personalized recommendations based on your current financial situation.',
        timestamp: new Date(),
        agent: selectedAgent,
      };
      setMessages((prev) => [...prev, agentResponse]);
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className='w-3 h-3 text-green-500' />;
      case 'thinking':
        return <Clock className='w-3 h-3 text-yellow-500' />;
      default:
        return <div className='w-3 h-3 rounded-full bg-gray-300' />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold'>AI Agent Command Center</h2>
        <p className='text-muted-foreground'>
          Interact with your specialized financial AI agents
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        {/* Agent Selection */}
        <div className='lg:col-span-1 space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Your AI Agents</CardTitle>
              <CardDescription>Select an agent to chat with</CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              {AI_AGENTS.map((agent) => {
                const IconComponent = agent.icon;
                return (
                  <Button
                    key={agent.id}
                    variant={selectedAgent === agent.id ? 'default' : 'outline'}
                    className='w-full justify-start h-auto p-3'
                    onClick={() => setSelectedAgent(agent.id)}
                  >
                    <div className='flex items-start gap-3 text-left'>
                      <div
                        className={`p-2 rounded-full ${agent.color} text-white`}
                      >
                        <IconComponent className='w-4 h-4' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center gap-2'>
                          <p className='font-medium truncate'>{agent.name}</p>
                          {getStatusIcon(agent.status)}
                        </div>
                        <p className='text-xs text-muted-foreground mt-1'>
                          {agent.lastActive}
                        </p>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          {/* Agent Info */}
          {currentAgent && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <currentAgent.icon className='w-5 h-5' />
                  {currentAgent.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-muted-foreground mb-3'>
                  {currentAgent.description}
                </p>
                <div>
                  <p className='text-sm font-medium mb-2'>Specialties:</p>
                  <div className='space-y-1'>
                    {currentAgent.specialties.map((specialty, index) => (
                      <Badge key={index} variant='outline' className='text-xs'>
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Chat Interface */}
        <div className='lg:col-span-2'>
          <Card className='h-[600px] flex flex-col'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <MessageSquare className='w-5 h-5' />
                Chat with {currentAgent?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className='flex-1 flex flex-col'>
              {/* Messages */}
              <div className='flex-1 overflow-y-auto space-y-4 mb-4'>
                {agentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className='text-sm'>{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.type === 'user'
                            ? 'text-blue-100'
                            : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className='flex gap-2'>
                <Input
                  placeholder={`Ask ${currentAgent?.name} a question...`}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} size='sm'>
                  <Send className='w-4 h-4' />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations Queue */}
        <div className='lg:col-span-1'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Lightbulb className='w-5 h-5' />
                Recommendations
              </CardTitle>
              <CardDescription>
                Priority actions from your agents
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              {recentRecommendations.map((rec) => (
                <div
                  key={rec.id}
                  className={`p-3 rounded-lg border-l-4 ${getPriorityColor(
                    rec.priority
                  )}`}
                >
                  <div className='flex items-start justify-between mb-2'>
                    <h4 className='font-medium text-sm'>{rec.title}</h4>
                    <Badge
                      variant={
                        rec.priority === 'high' ? 'destructive' : 'default'
                      }
                      className='text-xs'
                    >
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className='text-xs text-muted-foreground mb-2'>
                    {rec.description}
                  </p>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs font-medium text-green-600'>
                      {rec.impact}
                    </span>
                    <Button size='sm' variant='outline' className='h-6 text-xs'>
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
