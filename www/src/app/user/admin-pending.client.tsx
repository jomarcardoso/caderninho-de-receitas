"use client";

import AdminOnly from '@/components/admin-only';
import AdminPendingRecipes from '@/components/admin-pending-recipes/admin-pending-recipes';

export default function AdminPendingBlock() {
  return (
    <AdminOnly>
      <AdminPendingRecipes />
    </AdminOnly>
  );
}

