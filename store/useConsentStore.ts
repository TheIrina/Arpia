import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ConsentState {
    analytics: boolean;
    hasInteracted: boolean;
    setConsent: (analytics: boolean) => void;
}

export const useConsentStore = create<ConsentState>()(
    persist(
        (set) => ({
            analytics: false,
            hasInteracted: false,
            setConsent: (analytics) => set({ analytics, hasInteracted: true }),
        }),
        { name: 'arpia-consent-protocol' }
    )
);