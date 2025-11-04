'use client';

import { useEffect } from 'react';
import { defineCustomElements } from 'ionicons/loader';
import { addIcons } from 'ionicons';
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
} from 'ionicons/icons';

export default function IoniconsInit() {
  useEffect(() => {
    // Define the web component once on client
    defineCustomElements(window);

    // Register any icons we reference by name to avoid network fetch
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'list-outline': listOutline,
      'restaurant-outline': restaurantOutline,
      'search-outline': searchOutline,
      'search-circle-outline': searchCircleOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'create-outline': createOutline,
      'duplicate-outline': duplicateOutline,
      'save-outline': saveOutline,
      'add-circle-outline': addCircleOutline,
      'person-circle-outline': personCircleOutline,
    });
  }, []);

  return null;
}
