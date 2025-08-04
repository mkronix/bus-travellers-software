
import React, { createContext, useContext } from 'react';
import { useCustomDialog } from '@/hooks/useCustomDialog';

interface DialogContextType {
  showAlert: (title: string, description: string) => void;
  showConfirm: (title: string, description: string, onConfirm: () => void, onCancel?: () => void) => void;
  showDelete: (title: string, description: string, onConfirm: () => void, onCancel?: () => void) => void;
  showSuccess: (title: string, description: string) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};

interface DialogProviderProps {
  children: React.ReactNode;
}

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const { showAlert, showConfirm, showDelete, showSuccess, DialogComponent } = useCustomDialog();

  return (
    <DialogContext.Provider value={{ showAlert, showConfirm, showDelete, showSuccess }}>
      {children}
      <DialogComponent />
    </DialogContext.Provider>
  );
};
