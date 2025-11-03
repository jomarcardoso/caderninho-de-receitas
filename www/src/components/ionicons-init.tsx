"use client";

import { useEffect } from "react";
import { defineCustomElements } from "ionicons/loader";
import { addIcons } from "ionicons";
// Import only the icons you use to avoid fetching assets
import { arrowBackOutline, listOutline, restaurantOutline } from "ionicons/icons";

export default function IoniconsInit() {
  useEffect(() => {
    // Define the web component once on client
    defineCustomElements(window);

    // Register any icons we reference by name to avoid network fetch
    addIcons({
      "arrow-back-outline": arrowBackOutline,
      "list-outline": listOutline,
      "restaurant-outline": restaurantOutline,
    });
  }, []);

  return null;
}
