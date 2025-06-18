import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Progress } from '~/components/ui/progress';
import {
  DollarSign,
  TrendingUp,
  PiggyBank,
  CreditCard,
  Target,
  BarChart3,
  Upload,
  Bot,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Calculator,
  Zap,
  FileText,
  Plus,
} from 'lucide-react';

import { FinancialHealthScore } from '~/components/dashboard/FinancialHealthScore';
import { ExpenseAnalyzer } from '~/components/dashboard/ExpenseAnalyzer';
import { AIAgentCenter } from '~/components/dashboard/AIAgentCenter';
import { VisualAnalytics } from '~/components/dashboard/VisualAnalytics';
import { GoalManagement } from '~/components/dashboard/GoalManagement';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6'>
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-4xl font-bold text-slate-900'>
              AI Financial Coach
            </h1>
            <p className='text-slate-600 mt-2'>
              Your personalized path to financial wellness
            </p>
          </div>
          <div className='flex items-center gap-4'>
            <Badge variant='outline' className='px-3 py-1'>
              <Calendar className='w-4 h-4 mr-2' />
              Last updated: Today
            </Badge>
            <Button variant='outline' size='sm'>
              <Upload className='w-4 h-4 mr-2' />
              Import Data
            </Button>
          </div>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className='space-y-6'
        >
          <TabsList className='grid w-full grid-cols-5 lg:w-fit'>
            <TabsTrigger value='overview' className='flex items-center gap-2'>
              <BarChart3 className='w-4 h-4' />
              Overview
            </TabsTrigger>
            <TabsTrigger value='expenses' className='flex items-center gap-2'>
              <DollarSign className='w-4 h-4' />
              Expenses
            </TabsTrigger>
            <TabsTrigger value='ai-agents' className='flex items-center gap-2'>
              <Bot className='w-4 h-4' />
              AI Agents
            </TabsTrigger>
            <TabsTrigger value='analytics' className='flex items-center gap-2'>
              <TrendingUp className='w-4 h-4' />
              Analytics
            </TabsTrigger>
            <TabsTrigger value='goals' className='flex items-center gap-2'>
              <Target className='w-4 h-4' />
              Goals
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value='overview' className='space-y-6'>
            {/* Financial Health Score */}
            <FinancialHealthScore />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Zap className='w-5 h-5' />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Jump to key sections to manage your finances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  <Button
                    variant='outline'
                    className='h-20 flex flex-col gap-2'
                    onClick={() => setActiveTab('expenses')}
                  >
                    <DollarSign className='w-6 h-6' />
                    <span className='text-sm'>Track Expenses</span>
                  </Button>
                  <Button
                    variant='outline'
                    className='h-20 flex flex-col gap-2'
                    onClick={() => setActiveTab('goals')}
                  >
                    <Target className='w-6 h-6' />
                    <span className='text-sm'>Manage Goals</span>
                  </Button>
                  <Button
                    variant='outline'
                    className='h-20 flex flex-col gap-2'
                    onClick={() => setActiveTab('ai-agents')}
                  >
                    <Bot className='w-6 h-6' />
                    <span className='text-sm'>AI Insights</span>
                  </Button>
                  <Button
                    variant='outline'
                    className='h-20 flex flex-col gap-2'
                    onClick={() => setActiveTab('analytics')}
                  >
                    <BarChart3 className='w-6 h-6' />
                    <span className='text-sm'>View Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {/* Quick Stats Cards */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Monthly Income
                  </CardTitle>
                  <DollarSign className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-green-600'>
                    $5,200
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    <ArrowUpRight className='inline w-3 h-3 mr-1' />
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Monthly Expenses
                  </CardTitle>
                  <CreditCard className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-red-600'>$3,890</div>
                  <p className='text-xs text-muted-foreground'>
                    <ArrowDownRight className='inline w-3 h-3 mr-1' />
                    -5% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total Savings
                  </CardTitle>
                  <PiggyBank className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-blue-600'>
                    $15,420
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    <ArrowUpRight className='inline w-3 h-3 mr-1' />
                    +8% this quarter
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Emergency Fund
                  </CardTitle>
                  <Target className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>$8,500</div>
                  <div className='mt-2'>
                    <Progress value={68} className='h-2' />
                    <p className='text-xs text-muted-foreground mt-1'>
                      68% of 6-month goal
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Insights */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Bot className='w-5 h-5' />
                  Recent AI Insights
                </CardTitle>
                <CardDescription>
                  Latest recommendations from your AI financial agents
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-start gap-3 p-3 rounded-lg border-l-4 border-l-green-500 bg-green-50'>
                  <CheckCircle2 className='w-5 h-5 text-green-600 mt-0.5' />
                  <div>
                    <p className='font-medium text-green-900'>
                      Great progress on debt reduction!
                    </p>
                    <p className='text-sm text-green-700'>
                      You've paid off 23% more than planned this month. Consider
                      allocating the extra to your emergency fund.
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3 p-3 rounded-lg border-l-4 border-l-blue-500 bg-blue-50'>
                  <Calculator className='w-5 h-5 text-blue-600 mt-0.5' />
                  <div>
                    <p className='font-medium text-blue-900'>
                      Optimize your dining expenses
                    </p>
                    <p className='text-sm text-blue-700'>
                      AI detected $280 potential monthly savings by reducing
                      takeout frequency from 4 to 2 times per week.
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3 p-3 rounded-lg border-l-4 border-l-amber-500 bg-amber-50'>
                  <AlertCircle className='w-5 h-5 text-amber-600 mt-0.5' />
                  <div>
                    <p className='font-medium text-amber-900'>
                      Review subscription expenses
                    </p>
                    <p className='text-sm text-amber-700'>
                      Found 3 unused subscriptions totaling $47/month that could
                      be cancelled.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Expense Analyzer Tab */}
          <TabsContent value='expenses'>
            <ExpenseAnalyzer />
          </TabsContent>

          {/* AI Agents Tab */}
          <TabsContent value='ai-agents'>
            <AIAgentCenter />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value='analytics'>
            <VisualAnalytics />
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value='goals'>
            <GoalManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
