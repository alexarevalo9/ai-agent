import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Calendar,
  Download,
  Filter,
} from 'lucide-react';

// Sample data for charts
const expenseData = [
  { name: 'Housing', value: 1200, color: '#3b82f6' },
  { name: 'Food & Dining', value: 800, color: '#ef4444' },
  { name: 'Transportation', value: 450, color: '#10b981' },
  { name: 'Shopping', value: 300, color: '#8b5cf6' },
  { name: 'Entertainment', value: 250, color: '#f59e0b' },
  { name: 'Utilities', value: 180, color: '#f97316' },
  { name: 'Healthcare', value: 120, color: '#ec4899' },
  { name: 'Education', value: 100, color: '#6366f1' },
];

const monthlyData = [
  { month: 'Jan', income: 5200, expenses: 3800, savings: 1400 },
  { month: 'Feb', income: 5200, expenses: 4100, savings: 1100 },
  { month: 'Mar', income: 5200, expenses: 3900, savings: 1300 },
  { month: 'Apr', income: 5400, expenses: 3850, savings: 1550 },
  { month: 'May', income: 5400, expenses: 4200, savings: 1200 },
  { month: 'Jun', income: 5200, expenses: 3890, savings: 1310 },
];

const debtComparisonData = [
  {
    month: 'Month 1',
    avalanche: 15000,
    snowball: 15000,
  },
  {
    month: 'Month 6',
    avalanche: 12500,
    snowball: 13200,
  },
  {
    month: 'Month 12',
    avalanche: 9800,
    snowball: 10500,
  },
  {
    month: 'Month 18',
    avalanche: 6900,
    snowball: 7200,
  },
  {
    month: 'Month 24',
    avalanche: 3500,
    snowball: 4100,
  },
  {
    month: 'Month 30',
    avalanche: 0,
    snowball: 800,
  },
];

const savingsProgressData = [
  { month: 'Jan', emergencyFund: 6000, target: 12500, goalProgress: 48 },
  { month: 'Feb', emergencyFund: 6300, target: 12500, goalProgress: 50 },
  { month: 'Mar', emergencyFund: 6700, target: 12500, goalProgress: 54 },
  { month: 'Apr', emergencyFund: 7200, target: 12500, goalProgress: 58 },
  { month: 'May', emergencyFund: 7600, target: 12500, goalProgress: 61 },
  { month: 'Jun', emergencyFund: 8500, target: 12500, goalProgress: 68 },
];

export function VisualAnalytics() {
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-white p-3 border rounded-lg shadow-lg'>
          <p className='font-medium'>{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = ((data.value / totalExpenses) * 100).toFixed(1);
      return (
        <div className='bg-white p-3 border rounded-lg shadow-lg'>
          <p className='font-medium'>{data.name}</p>
          <p style={{ color: data.payload.color }}>
            ${data.value.toLocaleString()} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center'>
        <div>
          <h2 className='text-2xl font-bold'>Visual Analytics Suite</h2>
          <p className='text-muted-foreground'>
            Interactive charts and financial projections
          </p>
        </div>
        <div className='flex gap-2'>
          <Select defaultValue='6months'>
            <SelectTrigger className='w-40'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='1month'>Last Month</SelectItem>
              <SelectItem value='3months'>Last 3 Months</SelectItem>
              <SelectItem value='6months'>Last 6 Months</SelectItem>
              <SelectItem value='1year'>Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant='outline' size='sm'>
            <Download className='w-4 h-4 mr-2' />
            Export
          </Button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Expense Breakdown Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <PieChartIcon className='w-5 h-5' />
              Expense Breakdown
            </CardTitle>
            <CardDescription>Monthly spending by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='h-80'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx='50%'
                    cy='50%'
                    outerRadius={100}
                    fill='#8884d8'
                    dataKey='value'
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className='grid grid-cols-2 gap-2 mt-4'>
              {expenseData.slice(0, 6).map((item, index) => (
                <div key={index} className='flex items-center gap-2 text-sm'>
                  <div
                    className='w-3 h-3 rounded-full'
                    style={{ backgroundColor: item.color }}
                  />
                  <span className='truncate'>{item.name}</span>
                  <span className='font-mono'>${item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Income vs Expenses */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <BarChart3 className='w-5 h-5' />
              Income vs Expenses
            </CardTitle>
            <CardDescription>Monthly financial flow comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='h-80'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='month' />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey='income' fill='#10b981' name='Income' />
                  <Bar dataKey='expenses' fill='#ef4444' name='Expenses' />
                  <Bar dataKey='savings' fill='#3b82f6' name='Net Savings' />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className='flex justify-between text-sm text-muted-foreground mt-4'>
              <div className='flex items-center gap-2'>
                <TrendingUp className='w-4 h-4 text-green-500' />
                <span>Avg Monthly Income: $5,267</span>
              </div>
              <div className='flex items-center gap-2'>
                <TrendingDown className='w-4 h-4 text-red-500' />
                <span>Avg Monthly Expenses: $3,957</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Debt Payoff Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Activity className='w-5 h-5' />
              Debt Payoff Strategies
            </CardTitle>
            <CardDescription>
              Avalanche vs Snowball method comparison
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='h-80'>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={debtComparisonData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='month' />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type='monotone'
                    dataKey='avalanche'
                    stroke='#3b82f6'
                    strokeWidth={3}
                    name='Avalanche Method'
                  />
                  <Line
                    type='monotone'
                    dataKey='snowball'
                    stroke='#f59e0b'
                    strokeWidth={3}
                    name='Snowball Method'
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className='grid grid-cols-2 gap-4 mt-4'>
              <div className='text-center p-3 bg-blue-50 rounded-lg'>
                <p className='text-sm font-medium text-blue-900'>
                  Avalanche Method
                </p>
                <p className='text-xs text-blue-600'>Debt-free in 28 months</p>
                <p className='text-xs text-blue-600'>Total interest: $2,400</p>
              </div>
              <div className='text-center p-3 bg-yellow-50 rounded-lg'>
                <p className='text-sm font-medium text-yellow-900'>
                  Snowball Method
                </p>
                <p className='text-xs text-yellow-600'>
                  Debt-free in 31 months
                </p>
                <p className='text-xs text-yellow-600'>
                  Total interest: $2,850
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Savings Progress */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <TrendingUp className='w-5 h-5' />
              Savings Progress
            </CardTitle>
            <CardDescription>Emergency fund and goal tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='h-80'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart data={savingsProgressData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='month' />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type='monotone'
                    dataKey='emergencyFund'
                    stackId='1'
                    stroke='#10b981'
                    fill='#10b981'
                    fillOpacity={0.6}
                    name='Emergency Fund'
                  />
                  <Line
                    type='monotone'
                    dataKey='target'
                    stroke='#ef4444'
                    strokeWidth={2}
                    strokeDasharray='5 5'
                    name='Target Goal'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className='flex justify-between items-center mt-4'>
              <div>
                <p className='text-sm font-medium'>Current Progress</p>
                <p className='text-2xl font-bold text-green-600'>68%</p>
              </div>
              <div className='text-right'>
                <p className='text-sm text-muted-foreground'>Remaining</p>
                <p className='text-lg font-semibold'>$4,000</p>
                <p className='text-xs text-muted-foreground'>
                  ~8 months at current rate
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>
                  Net Worth Trend
                </p>
                <p className='text-2xl font-bold text-green-600'>+12.5%</p>
              </div>
              <TrendingUp className='w-8 h-8 text-green-500' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>
                  Savings Rate
                </p>
                <p className='text-2xl font-bold text-blue-600'>25.2%</p>
              </div>
              <PieChartIcon className='w-8 h-8 text-blue-500' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>
                  Debt-to-Income
                </p>
                <p className='text-2xl font-bold text-yellow-600'>15.8%</p>
              </div>
              <BarChart3 className='w-8 h-8 text-yellow-500' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>
                  Monthly Growth
                </p>
                <p className='text-2xl font-bold text-purple-600'>$1,310</p>
              </div>
              <Activity className='w-8 h-8 text-purple-500' />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
