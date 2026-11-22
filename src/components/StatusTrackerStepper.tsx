'use client';

import React from 'react';
import { BookingStatus } from '@/types';
import { statusTranslations } from '@/data/translations';
import { useLanguage } from './LanguageContext';
import { CheckCircle2, Clock, Package, Palette, Printer, Truck, XCircle } from 'lucide-react';

interface StatusTrackerStepperProps {
  currentStatus: BookingStatus;
  deliveryType?: 'pickup' | 'delivery';
}

export const StatusTrackerStepper: React.FC<StatusTrackerStepperProps> = ({
  currentStatus,
  deliveryType = 'pickup',
}) => {
  const { language } = useLanguage();

  if (currentStatus === 'cancelled') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full text-red-600 mb-2">
          <XCircle className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-red-800">
          {language === 'mr' ? 'बुकिंग रद्द करण्यात आले आहे' : 'Booking Cancelled'}
        </h4>
        <p className="text-xs text-red-600 mt-1">
          {language === 'mr'
            ? 'अधिक माहितीसाठी कृपया गुरु श्री ग्राफिक्सशी संपर्क साधा.'
            : 'Please contact Guru Shree Graphics for any queries.'}
        </p>
      </div>
    );
  }

  // Key visual stages representing the 14-step workflow in simplified milestone steps
  const milestones = [
    {
      id: 'received',
      labelEn: 'Received',
      labelMr: 'प्राप्त झाली',
      icon: Clock,
      matchingStatuses: ['booking_received', 'under_review', 'quotation_sent', 'waiting_approval'],
      stepNumber: 1,
    },
    {
      id: 'confirmed',
      labelEn: 'Confirmed',
      labelMr: 'निश्चित',
      icon: CheckCircle2,
      matchingStatuses: ['booking_confirmed'],
      stepNumber: 2,
    },
    {
      id: 'design',
      labelEn: 'Designing',
      labelMr: 'डिझायनिंग',
      icon: Palette,
      matchingStatuses: ['design_in_progress', 'design_preview_sent', 'design_approved'],
      stepNumber: 3,
    },
    {
      id: 'printing',
      labelEn: 'Printing',
      labelMr: 'प्रिंटिंग',
      icon: Printer,
      matchingStatuses: ['printing_in_progress', 'quality_checking'],
      stepNumber: 4,
    },
    {
      id: 'fulfillment',
      labelEn: deliveryType === 'delivery' ? 'Out for Delivery' : 'Ready for Pickup',
      labelMr: deliveryType === 'delivery' ? 'डिलिव्हरीसाठी रवाना' : 'पिकअपसाठी तयार',
      icon: deliveryType === 'delivery' ? Truck : Package,
      matchingStatuses: ['ready_for_pickup', 'out_for_delivery'],
      stepNumber: 5,
    },
    {
      id: 'completed',
      labelEn: 'Completed',
      labelMr: 'पूर्ण झाले',
      icon: CheckCircle2,
      matchingStatuses: ['completed'],
      stepNumber: 6,
    },
  ];

  const currentStep = statusTranslations[currentStatus]?.step || 1;

  // Map 14-step index to milestone index
  const getMilestoneIndex = (status: BookingStatus): number => {
    switch (status) {
      case 'booking_received':
      case 'under_review':
      case 'quotation_sent':
      case 'waiting_approval':
        return 0;
      case 'booking_confirmed':
        return 1;
      case 'design_in_progress':
      case 'design_preview_sent':
      case 'design_approved':
        return 2;
      case 'printing_in_progress':
      case 'quality_checking':
        return 3;
      case 'ready_for_pickup':
      case 'out_for_delivery':
        return 4;
      case 'completed':
        return 5;
      default:
        return 0;
    }
  };

  const activeMilestoneIndex = getMilestoneIndex(currentStatus);

  return (
    <div className="w-full py-4">
      <div className="relative">
        {/* Progress Bar Line */}
        <div className="absolute top-5 left-6 right-6 h-1 bg-slate-200 -z-0">
          <div
            className="h-full bg-gradient-to-r from-brand-orange to-brand-red transition-all duration-500"
            style={{ width: `${(activeMilestoneIndex / (milestones.length - 1)) * 100}%` }}
          />
        </div>

        {/* Milestone Steps */}
        <div className="relative z-10 flex justify-between">
          {milestones.map((m, index) => {
            const isCompleted = index < activeMilestoneIndex;
            const isCurrent = index === activeMilestoneIndex;
            const Icon = m.icon;

            return (
              <div key={m.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                      : isCurrent
                      ? 'bg-brand-orange border-brand-red text-white ring-4 ring-orange-100 scale-110 shadow-lg'
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`mt-2 text-xs font-semibold text-center max-w-[70px] ${
                    isCurrent
                      ? 'text-brand-orange font-bold'
                      : isCompleted
                      ? 'text-slate-800'
                      : 'text-slate-400'
                  }`}
                >
                  {language === 'mr' ? m.labelMr : m.labelEn}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current exact status callout */}
      <div className="mt-6 bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
        <p className="text-xs text-slate-500">
          {language === 'mr' ? 'सध्याची सविस्तर स्थिती:' : 'Exact Workflow Step:'}
        </p>
        <p className="text-sm font-bold text-navy-900 mt-0.5">
          {language === 'mr'
            ? statusTranslations[currentStatus]?.mr
            : statusTranslations[currentStatus]?.en}
        </p>
      </div>
    </div>
  );
};
