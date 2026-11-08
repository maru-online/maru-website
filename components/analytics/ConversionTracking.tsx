'use client';

import { useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface ConversionEvent {
  event: string;
  page: string;
  timestamp: number;
  assessment_type?: string;
  step?: string;
}

export function ConversionTracking() {
  const pathname = usePathname();

  // GA4 is the only destination. There used to be a second write to
  // /api/analytics, persisting the same events into an analytics_events table —
  // a store nobody reads, holding a strict subset of what GA4 already has. Its
  // DATABASE_URL_WEBSITE was malformed, so by 4 Aug 2026 it was returning 500 on
  // every conversion: a failing serverless invocation on the most valuable
  // events on the site, buying nothing. Removed rather than repaired.
  //
  // NOTE: pageviews are NOT tracked here. AnalyticsTracker is the single
  // source — this component firing its own page_view double-counted every load.
  const trackEvent = useCallback((event: string, data: Partial<ConversionEvent> = {}) => {
    if (typeof window === 'undefined') return;

    if (window.gtag) {
      window.gtag('event', event, {
        page_path: pathname,
        ...data,
      });
    }
  }, [pathname]);

  // Expose tracking function globally. Re-runs on pathname change — the previous
  // [] dependency froze the closure on the first route, so every conversion was
  // attributed to whichever page the visitor happened to land on.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.trackConversion = trackEvent;
    }
  }, [trackEvent]);

  return null;
}

// Assessment-specific tracking hooks
export const useAssessmentTracking = (assessmentType: string) => {
  const trackStep = (step: string, data?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.trackConversion) {
      window.trackConversion('assessment_step', {
        assessment_type: assessmentType,
        step,
        ...data,
      });
    }
  };

  const trackCompletion = (score?: number) => {
    if (typeof window !== 'undefined' && window.trackConversion) {
      window.trackConversion('assessment_completed', {
        assessment_type: assessmentType,
        score,
      });
    }
  };

  const trackEmailCapture = (email: string) => {
    if (typeof window !== 'undefined' && window.trackConversion) {
      window.trackConversion('email_captured', {
        assessment_type: assessmentType,
        email_domain: email.split('@')[1],
      });
    }
  };

  return { trackStep, trackCompletion, trackEmailCapture };
};

// Global type declaration