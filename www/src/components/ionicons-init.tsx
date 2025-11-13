'use client';

import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { defineCustomElements } from 'ionicons/loader';
import { addIcons } from 'ionicons';
import { UAParser } from 'ua-parser-js';
// Import only the icons you use to avoid fetching assets
import {
  arrowBackOutline,
  listOutline,
  restaurantOutline,
  searchOutline,
  searchCircleOutline,
  chevronForwardOutline,
  createOutline,
  duplicateOutline,
  saveOutline,
  addCircleOutline,
  personCircleOutline,
  personCircle,
  trashOutline,
  shareOutline,
  shareSocialOutline,
  checkmarkOutline,
  closeOutline,
  addOutline,
  homeOutline,
  personOutline,
} from 'ionicons/icons';

export default function IoniconsInit() {
  const parser = new UAParser(navigator.userAgent);
  const osName = (parser.getOS().name || '').toLowerCase();
  const isIOSLike = osName === 'ios';

  useEffect(() => {
    // Define the web component once on client
    defineCustomElements(window);

    // Detect platform via Capacitor and set a global mode class
    // Ensures consistent iOS/MD rendering even in web browsers
    try {
      const getBrowserMode = (): 'ios' | 'md' => {
        if (typeof navigator === 'undefined') return 'md';
        const parser = new UAParser(navigator.userAgent);
        const osName = (parser.getOS().name || '').toLowerCase();
        const isIOSLike = osName === 'ios';

        if (isIOSLike) return 'ios';

        const isAndroid = osName === 'android';

        if (isAndroid) return 'md';
        return 'md';
      };

      let mode: 'ios' | 'md' = 'md';
      try {
        const cap = Capacitor?.getPlatform?.(); // 'ios' | 'android' | 'web'
        if (cap === 'ios') mode = 'ios';
        else if (cap === 'android') mode = 'md';
        else mode = getBrowserMode();
      } catch {
        mode = getBrowserMode();
      }

      const el = document.documentElement;
      el.classList.remove('ios', 'md');
      el.classList.add(mode);
      (window as any).Ionic = {
        ...(window as any).Ionic,
        config: { ...(window as any).Ionic?.config, mode },
      };
    } catch {}

    // Register any icons we reference by name to avoid network fetch
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'list-outline': listOutline,
      'restaurant-outline': restaurantOutline,
      'search-outline': searchOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'create-outline': createOutline,
      'duplicate-outline': duplicateOutline,
      'save-outline': saveOutline,
      'add-outline': addOutline,
      'add-circle-outline': addCircleOutline,
      'person-circle-outline': personCircleOutline,
      'person-circle': personCircle,
      'trash-outline': trashOutline,
      'share-outline': isIOSLike ? shareOutline : shareSocialOutline,
      'close-outline': closeOutline,
      'checkmark-outline': checkmarkOutline,
      'home-outline': homeOutline,
      'person-outline': personOutline,
    });
  }, []);

  return null;
}
