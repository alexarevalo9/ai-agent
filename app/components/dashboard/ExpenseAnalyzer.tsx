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
import { Textarea } from '~/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Badge } from '~/components/ui/badge';
import {
  Upload,
  Plus,
  Filter,
  Download,
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Gamepad2,
  Heart,
  GraduationCap,
  Zap,
  Calendar,
  DollarSign,
} from 'lucide-react';

interface Expense {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
}

const EXPENSE_CATEGORIES = [
  { id: 'housing', label: 'Housing', icon: Home, color: 'bg-blue-500' },
  {
    id: 'transportation',
    label: 'Transportation',
    icon: Car,
    color: 'bg-green-500',
  },
  { id: 'food', label: 'Food & Dining', icon: Utensils, color: 'bg-red-500' },
  {
    id: 'shopping',
    label: 'Shopping',
    icon: ShoppingCart,
    color: 'bg-purple-500',
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
    icon: Gamepad2,
    color: 'bg-yellow-500',
  },
  { id: 'healthcare', label: 'Healthcare', icon: Heart, color: 'bg-pink-500' },
  {
    id: 'education',
    label: 'Education',
    icon: GraduationCap,
    color: 'bg-indigo-500',
  },
  { id: 'utilities', label: 'Utilities', icon: Zap, color: 'bg-orange-500' },
];

export function ExpenseAnalyzer() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      date: '2024-01-15',
      description: 'Grocery Store',
      amount: 127.45,
      category: 'food',
    },
    {
      id: '2',
      date: '2024-01-14',
      description: 'Gas Station',
      amount: 52.3,
      category: 'transportation',
    },
    {
      id: '3',
      date: '2024-01-13',
      description: 'Netflix Subscription',
      amount: 15.99,
      category: 'entertainment',
    },
    {
      id: '4',
      date: '2024-01-12',
      description: 'Electric Bill',
      amount: 89.67,
      category: 'utilities',
    },
    {
      id: '5',
      date: '2024-01-11',
      description: 'Restaurant Dinner',
      amount: 45.2,
      category: 'food',
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddingExpense, setIsAddingExpense] = useState(false);

  const filteredExpenses =
    selectedCategory === 'all'
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory);

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const categoryTotals = EXPENSE_CATEGORIES.map((category) => ({
    ...category,
    total: expenses
      .filter((expense) => expense.category === category.id)
      .reduce((sum, expense) => sum + expense.amount, 0),
  })).sort((a, b) => b.total - a.total);

  const getCategoryIcon = (categoryId: string) => {
    const category = EXPENSE_CATEGORIES.find((cat) => cat.id === categoryId);
    return category ? category.icon : ShoppingCart;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = EXPENSE_CATEGORIES.find((cat) => cat.id === categoryId);
    return category ? category.color : 'bg-gray-500';
  };

  return (
    <div className='space-y-6'>
      {/* Action Bar */}
      <div className='flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center'>
        <div>
          <h2 className='text-2xl font-bold'>Expense Analyzer</h2>
          <p className='text-muted-foreground'>
            Track and categorize your spending patterns
          </p>
        </div>
        <div className='flex gap-2'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='outline'>
                <Upload className='w-4 h-4 mr-2' />
                Import CSV
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Expenses from CSV</DialogTitle>
                <DialogDescription>
                  Upload a CSV file with columns: Date, Description, Amount,
                  Category (optional)
                </DialogDescription>
              </DialogHeader>
              <div className='space-y-4'>
                <div className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center'>
                  <Upload className='w-8 h-8 mx-auto mb-4 text-gray-400' />
                  <p className='text-sm text-gray-600'>
                    Drag and drop your CSV file here, or click to browse
                  </p>
                  <Button variant='outline' className='mt-2'>
                    Choose File
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddingExpense} onOpenChange={setIsAddingExpense}>
            <DialogTrigger asChild>
              <Button>
                <Plus className='w-4 h-4 mr-2' />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>
                  Manually enter expense details
                </DialogDescription>
              </DialogHeader>
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='text-sm font-medium'>Date</label>
                    <Input
                      type='date'
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className='text-sm font-medium'>Amount</label>
                    <Input type='number' placeholder='0.00' step='0.01' />
                  </div>
                </div>
                <div>
                  <label className='text-sm font-medium'>Description</label>
                  <Input placeholder='Enter expense description' />
                </div>
                <div>
                  <label className='text-sm font-medium'>Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPENSE_CATEGORIES.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <div className='flex items-center gap-2'>
                            <category.icon className='w-4 h-4' />
                            {category.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='flex gap-2 pt-4'>
                  <Button className='flex-1'>Add Expense</Button>
                  <Button
                    variant='outline'
                    onClick={() => setIsAddingExpense(false)}
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
        {/* Expense Categories Overview */}
        <div className='lg:col-span-1'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Filter className='w-5 h-5' />
                Categories
              </CardTitle>
              <CardDescription>Spending breakdown by category</CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size='sm'
                className='w-full justify-start'
                onClick={() => setSelectedCategory('all')}
              >
                <DollarSign className='w-4 h-4 mr-2' />
                All Categories (${totalExpenses.toFixed(2)})
              </Button>
              {categoryTotals.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={
                      selectedCategory === category.id ? 'default' : 'outline'
                    }
                    size='sm'
                    className='w-full justify-between'
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className='flex items-center gap-2'>
                      <IconComponent className='w-4 h-4' />
                      {category.label}
                    </div>
                    <span className='font-mono text-sm'>
                      ${category.total.toFixed(2)}
                    </span>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Expense List */}
        <div className='lg:col-span-2'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <div>
                <CardTitle>Recent Expenses</CardTitle>
                <CardDescription>
                  {selectedCategory === 'all'
                    ? `Showing all ${filteredExpenses.length} expenses`
                    : `Showing ${filteredExpenses.length} ${
                        EXPENSE_CATEGORIES.find(
                          (cat) => cat.id === selectedCategory
                        )?.label
                      } expenses`}
                </CardDescription>
              </div>
              <Button variant='outline' size='sm'>
                <Download className='w-4 h-4 mr-2' />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {filteredExpenses.map((expense) => {
                  const IconComponent = getCategoryIcon(expense.category);
                  return (
                    <div
                      key={expense.id}
                      className='flex items-center justify-between p-3 rounded-lg border'
                    >
                      <div className='flex items-center gap-3'>
                        <div
                          className={`p-2 rounded-full ${getCategoryColor(
                            expense.category
                          )} text-white`}
                        >
                          <IconComponent className='w-4 h-4' />
                        </div>
                        <div>
                          <p className='font-medium'>{expense.description}</p>
                          <p className='text-sm text-muted-foreground flex items-center gap-1'>
                            <Calendar className='w-3 h-3' />
                            {new Date(expense.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className='text-right'>
                        <p className='font-mono font-semibold'>
                          ${expense.amount.toFixed(2)}
                        </p>
                        <Badge variant='outline' className='text-xs'>
                          {
                            EXPENSE_CATEGORIES.find(
                              (cat) => cat.id === expense.category
                            )?.label
                          }
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
