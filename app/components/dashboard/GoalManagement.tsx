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
import { Progress } from '~/components/ui/progress';
import { Badge } from '~/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {
  Target,
  PiggyBank,
  CreditCard,
  Plus,
  Calculator,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Clock,
  Home,
  Car,
  GraduationCap,
  Plane,
  Heart,
  Award,
  Edit,
  Trash2,
} from 'lucide-react';

interface Goal {
  id: string;
  type: 'emergency' | 'savings' | 'debt';
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'completed' | 'paused';
  icon: any;
  color: string;
}

const GOAL_TYPES = [
  {
    id: 'emergency',
    label: 'Emergency Fund',
    icon: Target,
    color: 'bg-red-500',
  },
  { id: 'vacation', label: 'Vacation', icon: Plane, color: 'bg-blue-500' },
  {
    id: 'house',
    label: 'House Down Payment',
    icon: Home,
    color: 'bg-green-500',
  },
  { id: 'car', label: 'New Car', icon: Car, color: 'bg-purple-500' },
  {
    id: 'education',
    label: 'Education',
    icon: GraduationCap,
    color: 'bg-indigo-500',
  },
  {
    id: 'retirement',
    label: 'Retirement',
    icon: Award,
    color: 'bg-yellow-500',
  },
  {
    id: 'health',
    label: 'Health & Wellness',
    icon: Heart,
    color: 'bg-pink-500',
  },
];

export function GoalManagement() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      type: 'emergency',
      title: 'Emergency Fund',
      description: '6 months of expenses',
      targetAmount: 12500,
      currentAmount: 8500,
      targetDate: '2024-12-31',
      priority: 'high',
      status: 'active',
      icon: Target,
      color: 'bg-red-500',
    },
    {
      id: '2',
      type: 'savings',
      title: 'Vacation Fund',
      description: 'Europe trip summer 2024',
      targetAmount: 5000,
      currentAmount: 2800,
      targetDate: '2024-06-15',
      priority: 'medium',
      status: 'active',
      icon: Plane,
      color: 'bg-blue-500',
    },
    {
      id: '3',
      type: 'savings',
      title: 'House Down Payment',
      description: '20% down payment',
      targetAmount: 50000,
      currentAmount: 18500,
      targetDate: '2025-06-01',
      priority: 'high',
      status: 'active',
      icon: Home,
      color: 'bg-green-500',
    },
  ]);

  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [emergencyCalculator, setEmergencyCalculator] = useState({
    monthlyExpenses: 4200,
    months: 6,
    isOpen: false,
  });

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getTimeToGoal = (
    current: number,
    target: number,
    monthlyContribution: number = 300
  ) => {
    if (current >= target) return 'Goal reached!';
    const remaining = target - current;
    const months = Math.ceil(remaining / monthlyContribution);

    if (months <= 12) {
      return `${months} months`;
    } else {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      return `${years}y ${remainingMonths}m`;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const milestones = [
    {
      id: '1',
      title: 'First $1,000 saved',
      description: 'Emergency fund starter',
      completed: true,
      date: '2023-12-15',
    },
    {
      id: '2',
      title: '50% Emergency Fund',
      description: 'Halfway to 6-month goal',
      completed: true,
      date: '2024-01-20',
    },
    {
      id: '3',
      title: 'Vacation Fund 50%',
      description: 'Europe trip halfway funded',
      completed: true,
      date: '2024-01-10',
    },
    {
      id: '4',
      title: 'House Fund $20k',
      description: 'First major house milestone',
      completed: false,
      date: null,
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center'>
        <div>
          <h2 className='text-2xl font-bold'>Goal Management Hub</h2>
          <p className='text-muted-foreground'>
            Track and achieve your financial milestones
          </p>
        </div>
        <div className='flex gap-2'>
          <Dialog
            open={emergencyCalculator.isOpen}
            onOpenChange={(open) =>
              setEmergencyCalculator((prev) => ({ ...prev, isOpen: open }))
            }
          >
            <DialogTrigger asChild>
              <Button variant='outline'>
                <Calculator className='w-4 h-4 mr-2' />
                Emergency Calculator
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Emergency Fund Calculator</DialogTitle>
                <DialogDescription>
                  Calculate your recommended emergency fund size
                </DialogDescription>
              </DialogHeader>
              <div className='space-y-4'>
                <div>
                  <label className='text-sm font-medium'>
                    Monthly Expenses
                  </label>
                  <Input
                    type='number'
                    value={emergencyCalculator.monthlyExpenses}
                    onChange={(e) =>
                      setEmergencyCalculator((prev) => ({
                        ...prev,
                        monthlyExpenses: parseFloat(e.target.value) || 0,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className='text-sm font-medium'>
                    Number of Months
                  </label>
                  <Select
                    value={emergencyCalculator.months.toString()}
                    onValueChange={(value) =>
                      setEmergencyCalculator((prev) => ({
                        ...prev,
                        months: parseInt(value),
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='3'>3 months</SelectItem>
                      <SelectItem value='6'>6 months</SelectItem>
                      <SelectItem value='9'>9 months</SelectItem>
                      <SelectItem value='12'>12 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='p-4 bg-blue-50 rounded-lg'>
                  <p className='text-sm font-medium text-blue-900'>
                    Recommended Emergency Fund
                  </p>
                  <p className='text-3xl font-bold text-blue-600'>
                    $
                    {(
                      emergencyCalculator.monthlyExpenses *
                      emergencyCalculator.months
                    ).toLocaleString()}
                  </p>
                  <p className='text-sm text-blue-700 mt-1'>
                    {emergencyCalculator.months} months of expenses
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddingGoal} onOpenChange={setIsAddingGoal}>
            <DialogTrigger asChild>
              <Button>
                <Plus className='w-4 h-4 mr-2' />
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Goal</DialogTitle>
                <DialogDescription>
                  Set up a new financial goal to track
                </DialogDescription>
              </DialogHeader>
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='text-sm font-medium'>Goal Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder='Select type' />
                      </SelectTrigger>
                      <SelectContent>
                        {GOAL_TYPES.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className='flex items-center gap-2'>
                              <type.icon className='w-4 h-4' />
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className='text-sm font-medium'>Priority</label>
                    <Select defaultValue='medium'>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='high'>High</SelectItem>
                        <SelectItem value='medium'>Medium</SelectItem>
                        <SelectItem value='low'>Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className='text-sm font-medium'>Goal Title</label>
                  <Input placeholder='Enter goal title' />
                </div>
                <div>
                  <label className='text-sm font-medium'>Description</label>
                  <Input placeholder='Brief description' />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='text-sm font-medium'>Target Amount</label>
                    <Input type='number' placeholder='0.00' />
                  </div>
                  <div>
                    <label className='text-sm font-medium'>
                      Current Amount
                    </label>
                    <Input type='number' placeholder='0.00' />
                  </div>
                </div>
                <div>
                  <label className='text-sm font-medium'>Target Date</label>
                  <Input type='date' />
                </div>
                <div className='flex gap-2 pt-4'>
                  <Button className='flex-1'>Create Goal</Button>
                  <Button
                    variant='outline'
                    onClick={() => setIsAddingGoal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Goals List */}
        <div className='lg:col-span-2 space-y-4'>
          {goals.map((goal) => {
            const IconComponent = goal.icon;
            const progress = getProgressPercentage(
              goal.currentAmount,
              goal.targetAmount
            );
            const timeToGoal = getTimeToGoal(
              goal.currentAmount,
              goal.targetAmount
            );

            return (
              <Card key={goal.id} className='relative'>
                <CardHeader className='pb-3'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-center gap-3'>
                      <div
                        className={`p-2 rounded-full ${goal.color} text-white`}
                      >
                        <IconComponent className='w-5 h-5' />
                      </div>
                      <div>
                        <CardTitle className='text-lg'>{goal.title}</CardTitle>
                        <CardDescription>{goal.description}</CardDescription>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Badge className={getPriorityColor(goal.priority)}>
                        {goal.priority}
                      </Badge>
                      <Badge className={getStatusColor(goal.status)}>
                        {goal.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-muted-foreground'>
                        Progress
                      </span>
                      <span className='text-sm font-medium'>
                        {progress.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={progress} className='h-3' />
                    <div className='grid grid-cols-3 gap-4 text-sm'>
                      <div>
                        <p className='text-muted-foreground'>Current</p>
                        <p className='font-semibold'>
                          ${goal.currentAmount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className='text-muted-foreground'>Target</p>
                        <p className='font-semibold'>
                          ${goal.targetAmount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className='text-muted-foreground'>Time to goal</p>
                        <p className='font-semibold'>{timeToGoal}</p>
                      </div>
                    </div>
                    <div className='flex justify-between items-center pt-2'>
                      <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                        <Calendar className='w-3 h-3' />
                        Target: {new Date(goal.targetDate).toLocaleDateString()}
                      </div>
                      <div className='flex gap-1'>
                        <Button
                          size='sm'
                          variant='outline'
                          className='h-8 w-8 p-0'
                        >
                          <Edit className='w-3 h-3' />
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          className='h-8 w-8 p-0'
                        >
                          <Trash2 className='w-3 h-3' />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Goal Overview</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex justify-between items-center'>
                <span className='text-sm'>Active Goals</span>
                <span className='font-semibold'>
                  {goals.filter((g) => g.status === 'active').length}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm'>Total Target</span>
                <span className='font-semibold'>
                  $
                  {goals
                    .reduce((sum, goal) => sum + goal.targetAmount, 0)
                    .toLocaleString()}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm'>Total Saved</span>
                <span className='font-semibold text-green-600'>
                  $
                  {goals
                    .reduce((sum, goal) => sum + goal.currentAmount, 0)
                    .toLocaleString()}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm'>Remaining</span>
                <span className='font-semibold'>
                  $
                  {goals
                    .reduce(
                      (sum, goal) =>
                        sum + (goal.targetAmount - goal.currentAmount),
                      0
                    )
                    .toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Award className='w-5 h-5' />
                Milestones
              </CardTitle>
              <CardDescription>Recent achievements</CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              {milestones.map((milestone) => (
                <div key={milestone.id} className='flex items-start gap-3'>
                  <div
                    className={`p-1 rounded-full mt-0.5 ${
                      milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-3 h-3 ${
                        milestone.completed ? 'text-white' : 'text-gray-500'
                      }`}
                    />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p
                      className={`text-sm font-medium ${
                        milestone.completed ? 'text-green-900' : 'text-gray-700'
                      }`}
                    >
                      {milestone.title}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {milestone.description}
                    </p>
                    {milestone.completed && milestone.date && (
                      <p className='text-xs text-green-600'>
                        {new Date(milestone.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Monthly Allocation Suggestion */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <TrendingUp className='w-5 h-5' />
                Suggested Allocation
              </CardTitle>
              <CardDescription>Optimize your monthly savings</CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='p-3 bg-blue-50 rounded-lg'>
                <p className='text-sm font-medium text-blue-900'>
                  Available to Allocate
                </p>
                <p className='text-2xl font-bold text-blue-600'>$1,310</p>
                <p className='text-xs text-blue-700'>Based on your surplus</p>
              </div>
              <div className='space-y-2'>
                <div className='flex justify-between items-center text-sm'>
                  <span>Emergency Fund</span>
                  <span className='font-medium'>$500 (38%)</span>
                </div>
                <div className='flex justify-between items-center text-sm'>
                  <span>House Down Payment</span>
                  <span className='font-medium'>$600 (46%)</span>
                </div>
                <div className='flex justify-between items-center text-sm'>
                  <span>Vacation Fund</span>
                  <span className='font-medium'>$210 (16%)</span>
                </div>
              </div>
              <Button className='w-full' size='sm'>
                Apply Allocation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
