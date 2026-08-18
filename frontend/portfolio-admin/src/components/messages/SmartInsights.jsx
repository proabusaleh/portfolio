import {
  DollarSign, Briefcase, AlertTriangle,
  MessageSquare, Tag,
} from 'lucide-react';
import { cn } from '../../lib/utils';

function detectInsights(message) {
  const text = (message.subject + ' ' + message.message).toLowerCase();
  const insights = [];

  const budgetMatch = text.match(/\$[\d,]+(?:\s*[-–]\s*\$[\d,]+)?/);
  if (budgetMatch) {
    insights.push({
      icon: DollarSign,
      label: 'Budget Mentioned',
      value: budgetMatch[0],
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-950/30',
    });
  }

  const types = [
    { pattern: /\b(app|mobile|flutter|dart)\b/i, label: 'Mobile App' },
    { pattern: /\b(website|wordpress|site|blog)\b/i, label: 'Website' },
    { pattern: /\b(e-commerce|store|woocommerce|shop)\b/i, label: 'E-commerce' },
    { pattern: /\b(ui\/ux|design|figma|prototype)\b/i, label: 'UI/UX Design' },
    { pattern: /\b(api|backend|firebase|server)\b/i, label: 'Backend/API' },
  ];
  for (const t of types) {
    if (t.pattern.test(text)) {
      insights.push({
        icon: Briefcase,
        label: 'Project Type',
        value: t.label,
        color: 'text-indigo-600 dark:text-indigo-400',
        bg: 'bg-indigo-50 dark:bg-indigo-950/30',
      });
      break;
    }
  }

  if (/\b(urgent|asap|immediately|rush)\b/i.test(text)) {
    insights.push({
      icon: AlertTriangle,
      label: 'Urgency',
      value: 'Urgent Request',
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-950/30',
    });
  }

  if (/\b(partner|collaborat|together|team)\b/i.test(text)) {
    insights.push({
      icon: MessageSquare,
      label: 'Intent',
      value: 'Collaboration',
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/30',
    });
  } else if (/\b(inquir|need|looking for|want)\b/i.test(text)) {
    insights.push({
      icon: MessageSquare,
      label: 'Intent',
      value: 'Project Inquiry',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/30',
    });
  }

  return insights;
}

export default function SmartInsights({ message }) {
  if (!message) return null;
  const insights = detectInsights(message);
  if (insights.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
        <Tag className="w-3 h-3" />
        Smart Insights
      </h4>
      <div className="space-y-1.5">
        {insights.map((insight, i) => (
          <div
            key={i}
            className={cn(
              'flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs',
              insight.bg
            )}
          >
            <insight.icon className={cn('w-3.5 h-3.5 shrink-0', insight.color)} />
            <span className="text-gray-500 dark:text-gray-400">{insight.label}:</span>
            <span className={cn('font-medium', insight.color)}>{insight.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
