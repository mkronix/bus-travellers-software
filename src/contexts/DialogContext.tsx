import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DialogContextType {
  showAlert: (message: string, title?: string) => Promise<void>;
  showConfirm: (message: string, title?: string) => Promise<boolean>;
  showDeleteConfirm: (itemName: string) => Promise<boolean>;
}

interface DialogState {
  isOpen: boolean;
  type: 'alert' | 'confirm' | 'delete';
  title: string;
  message: string;
  resolve: ((value: any) => void) | null;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    type: 'alert',
    title: '',
    message: '',
    resolve: null,
  });

  const showAlert = (message: string, title: string = 'Alert') => {
    return new Promise<void>((resolve) => {
      setDialogState({
        isOpen: true,
        type: 'alert',
        title,
        message,
        resolve,
      });
    });
  };

  const showConfirm = (message: string, title: string = 'Confirm') => {
    return new Promise<boolean>((resolve) => {
      setDialogState({
        isOpen: true,
        type: 'confirm',
        title,
        message,
        resolve,
      });
    });
  };

  const showDeleteConfirm = (itemName: string) => {
    return new Promise<boolean>((resolve) => {
      setDialogState({
        isOpen: true,
        type: 'delete',
        title: 'Delete Confirmation',
        message: `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
        resolve,
      });
    });
  };

  const handleClose = (confirmed: boolean = false) => {
    if (dialogState.resolve) {
      if (dialogState.type === 'alert') {
        dialogState.resolve(undefined);
      } else {
        dialogState.resolve(confirmed);
      }
    }
    setDialogState(prev => ({ ...prev, isOpen: false, resolve: null }));
  };

  return (
    <DialogContext.Provider value={{ showAlert, showConfirm, showDeleteConfirm }}>
      {children}
      {dialogState.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {dialogState.title}
              </h3>
              <p className="text-gray-700 mb-6">
                {dialogState.message}
              </p>
              <div className="flex gap-3 justify-end">
                {dialogState.type === 'alert' ? (
                  <button
                    onClick={() => handleClose()}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    OK
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleClose(false)}
                      className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleClose(true)}
                      className={`px-6 py-2 text-white rounded-lg transition-colors ${
                        dialogState.type === 'delete'
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-primary hover:bg-primary/90'
                      }`}
                    >
                      {dialogState.type === 'delete' ? 'Delete' : 'Confirm'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};