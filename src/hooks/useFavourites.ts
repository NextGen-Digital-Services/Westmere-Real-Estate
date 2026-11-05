"use client";

import { useEffect, useState } from "react";
import { getStoredFavourites, toggleStoredFavourite } from "@/lib/storage";

export function useFavourites() {
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    setFavourites(getStoredFavourites());

    const handleUpdate = () => {
      setFavourites(getStoredFavourites());
    };

    window.addEventListener("vdm_favourites_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("vdm_favourites_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const toggle = (propertyId: string) => {
    const updated = toggleStoredFavourite(propertyId);
    setFavourites(updated);
  };

  const isFavourite = (propertyId: string) => favourites.includes(propertyId);

  return {
    favourites,
    count: favourites.length,
    toggle,
    isFavourite,
  };
}
