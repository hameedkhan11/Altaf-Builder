// components/cards/BlogCardAnimations.tsx (Optimized Client Component)
"use client";
import React, { useRef, useEffect, useCallback } from 'react';
import { sharedObserver } from '../blogs/animationObserver';

interface BlogCardAnimationsProps {
  index: number;
}

export const BlogCardAnimations: React.FC<BlogCardAnimationsProps> = ({ index }) => {
  const cardRef = useRef<HTMLElement | null>(null);
  const isInitialized = useRef(false);

  const animateCard = useCallback(() => {
    if (!cardRef.current || isInitialized.current) return;
    
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Just show the card without animation
      cardRef.current.style.opacity = '1';
      cardRef.current.style.transform = 'none';
      return;
    }

    isInitialized.current = true;
    const card = cardRef.current;
    const delay = Math.min(index * 80, 400);

    // Animate main card
    requestAnimationFrame(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0) scale(1)';
      card.style.transition = `all 0.6s cubic-bezier(0.25, 0.25, 0, 1) ${delay}ms`;
      
      // Animate child elements with stagger
      const childElements = card.querySelectorAll('.animate-child') as NodeListOf<HTMLElement>;
      childElements.forEach((el, i) => {
        requestAnimationFrame(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.style.transition = `all 0.4s ease-out ${delay + 150 + i * 80}ms`;
        });
      });
    });
  }, [index]);

  const setupHoverEffects = useCallback(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    
    // Use passive listeners for better performance
    const handleMouseEnter = () => {
      card.style.transform = 'translateY(-8px) scale(1.01)';
      card.style.boxShadow = '0 20px 40px -12px rgba(0, 0, 0, 0.2)';
      card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.25, 0, 1)';
    };

    const handleMouseLeave = () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
      card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.25, 0, 1)';
    };

    // Only add hover effects on non-touch devices
    if (!('ontouchstart' in window)) {
      card.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      card.addEventListener('mouseleave', handleMouseLeave, { passive: true });
      
      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  useEffect(() => {
    // Find the blog card element
    const script = document.currentScript || document.querySelector(`script[data-index="${index}"]`);
    const card = script?.previousElementSibling as HTMLElement;
    
    if (card?.classList.contains('blog-card')) {
      cardRef.current = card;
      
      // Use shared observer for better performance
      sharedObserver.observe(card, () => {
        animateCard();
        setupHoverEffects();
      });
    }

    return () => {
      if (cardRef.current) {
        sharedObserver.unobserve(cardRef.current);
      }
    };
  }, [index, animateCard, setupHoverEffects]);

  // Return a small script tag as marker for finding the card
  return <script data-index={index} style={{ display: 'none' }} />;
};