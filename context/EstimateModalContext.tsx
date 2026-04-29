"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import EstimateModal from "@/components/EstimateModal";

interface EstimateModalContextType {
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
}

const EstimateModalContext = createContext<EstimateModalContextType | undefined>(undefined);

export function EstimateModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <EstimateModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      <EstimateModal isOpen={isOpen} onClose={closeModal} />
    </EstimateModalContext.Provider>
  );
}

export function useEstimateModal() {
  const context = useContext(EstimateModalContext);
  if (context === undefined) {
    throw new Error("useEstimateModal must be used within an EstimateModalProvider");
  }
  return context;
}
