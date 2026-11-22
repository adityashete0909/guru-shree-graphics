'use client';

import React from 'react';
import { BookingStatus } from '@/types';
import { statusTranslations } from '@/data/translations';
import { useLanguage } from './LanguageContext';

interface OrderStatusBadgeProps {
  status: BookingStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, size = 'md' }) => {
  const { language } = useLanguage();
  const info = statusTranslations[status] || {
    en: status,
    mr: status,
    color: 'bg-slate-100 text-slate-800 border-slate-300',
    step: 0,
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3.5 py-1.5 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border shadow-sm ${info.color} ${sizeClasses[size]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-75 animate-pulse" />
      {language === 'mr' ? info.mr : info.en}
    </span>
  );
};
