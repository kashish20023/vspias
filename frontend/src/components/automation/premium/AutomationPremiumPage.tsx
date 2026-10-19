'use client';

import React, { useState, useEffect } from 'react';
import '@/styles/automation-premium.css';
import AutomationSymbols from './AutomationSymbols';
import AutomationHeroSection from './AutomationHeroSection';
import { AutomationBrandsBand } from './AutomationBrandsBand';
import { AutomationRangeRail } from './AutomationRangeRail';
import { AutomationCatalogSection } from './AutomationCatalogSection';
import { AutomationWorkingDemosSection } from './AutomationWorkingDemosSection';
import { AutomationEngineeringSection } from './AutomationEngineeringSection';
import { AutomationIndustriesSection } from './AutomationIndustriesSection';
import { AutomationCompanyContactSection } from './AutomationCompanyContactSection';
import { AutomationModals } from './AutomationModals';
import { AutomationProduct, AUTOMATION_PRODUCTS } from './data';

export function AutomationPremiumPage() {
  const [selectedProduct, setSelectedProduct] = useState<AutomationProduct | null>(null);
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Scroll reveal observer
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('seen', 'visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    document.documentElement.classList.add('motion-ready');

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('motion-ready');
    };
  }, []);

  const handleOpenProduct = (product: AutomationProduct) => {
    setSelectedProduct(product);
  };

  const handleOpenProductById = (id: string) => {
    const found = AUTOMATION_PRODUCTS.find((p) => p.id === id);
    if (found) {
      setSelectedProduct(found);
    }
  };

  const handleEnquiry = (context: string) => {
    const formContainer = document.getElementById('enquiry-form-container');
    if (formContainer) {
      formContainer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnquireFromProduct = (
    product: AutomationProduct,
    isDatasheet = false
  ) => {
    setSelectedProduct(null);
    const formContainer = document.getElementById('enquiry-form-container');
    if (formContainer) {
      formContainer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="automation-premium-page" id="automation-home">
      {/* SVG Iconography Sprite */}
      <AutomationSymbols />

      <a className="skip-link" href="#automation-hero">
        Skip to content
      </a>

      {/* Main Content Sections */}
      <main id="main-content">
        <AutomationHeroSection
          onSelectCategoryFilter={(cat: string) => {
            setSelectedCategory(cat);
            const catalog = document.getElementById('automation-catalog');
            catalog?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenProduct={(id: string) => handleOpenProductById(id)}
          onOpenImageModal={() => setIsHeroModalOpen(true)}
        />

        <AutomationBrandsBand />

        <AutomationRangeRail
          onSelectFamily={(cat: string) => {
            setSelectedCategory(cat);
            const catalog = document.getElementById('automation-catalog');
            catalog?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <AutomationCatalogSection
          onOpenProduct={handleOpenProduct}
          externalCategory={selectedCategory}
        />

        <AutomationWorkingDemosSection
          onOpenEnquiry={handleEnquiry}
          onOpenNotes={() => setIsNotesModalOpen(true)}
        />

        <AutomationEngineeringSection
          onOpenProductById={handleOpenProductById}
        />

        <AutomationIndustriesSection onOpenEnquiry={handleEnquiry} />

        <AutomationCompanyContactSection
          onStartConversation={() => handleEnquiry('Electrical & industrial automation')}
        />
      </main>

      {/* Modals & Dialogs */}
      <AutomationModals
        selectedProduct={selectedProduct}
        isHeroImageModalOpen={isHeroModalOpen}
        isNotesModalOpen={isNotesModalOpen}
        onCloseProduct={() => setSelectedProduct(null)}
        onCloseHeroImage={() => setIsHeroModalOpen(false)}
        onCloseNotes={() => setIsNotesModalOpen(false)}
        onEnquireProduct={handleEnquireFromProduct}
      />
    </div>
  );
}
