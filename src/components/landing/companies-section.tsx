import React from 'react';
import { CompaniesCarousel } from './companies-carousel';

export const CompaniesSection = () => {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-16 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6">
        <CompaniesCarousel />
      </div>
    </section>
  );
};
