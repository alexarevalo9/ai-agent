import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Badge } from '~/components/ui/badge';
import { TrendingUp, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function FinancialHealthScore() {
  const healthScore = 78;
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80)
      return { label: 'Excellent', color: 'bg-green-500', icon: CheckCircle2 };
    if (score >= 60)
      return { label: 'Good', color: 'bg-yellow-500', icon: Shield };
    return {
      label: 'Needs Attention',
      color: 'bg-red-500',
      icon: AlertTriangle,
    };
  };

  const status = getScoreStatus(healthScore);
  const StatusIcon = status.icon;

  return (
    <Card className='bg-gradient-to-r from-blue-600 to-purple-600 text-white'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span className='flex items-center gap-2'>
            <TrendingUp className='w-6 h-6' />
            Financial Health Score
          </span>
          <Badge variant='secondary' className='text-slate-900'>
            <StatusIcon className='w-4 h-4 mr-1' />
            {status.label}
          </Badge>
        </CardTitle>
        <CardDescription className='text-blue-100'>
          Your overall financial wellness assessment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-between'>
          <div>
            <div
              className={`text-5xl font-bold ${getScoreColor(
                healthScore
              )} text-white`}
            >
              {healthScore}
            </div>
            <div className='text-blue-100 text-sm mt-1'>out of 100</div>
          </div>
          <div className='flex-1 ml-8'>
            <Progress value={healthScore} className='h-3 bg-blue-800' />
            <div className='grid grid-cols-3 gap-4 mt-4 text-sm'>
              <div className='text-center'>
                <div className='font-semibold'>Budgeting</div>
                <div className='text-blue-200'>85/100</div>
              </div>
              <div className='text-center'>
                <div className='font-semibold'>Savings</div>
                <div className='text-blue-200'>72/100</div>
              </div>
              <div className='text-center'>
                <div className='font-semibold'>Debt</div>
                <div className='text-blue-200'>76/100</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
