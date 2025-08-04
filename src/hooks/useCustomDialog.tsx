
import { useState } from 'react';
import CustomDialog from '@/components/ui/custom-dialog';

interface DialogConfig {
  type: 'alert' | 'confirm' | 'delete' | 'success';
  title: string;
  description: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const useCustomDialog = () => {
  const [dialogConfig, setDialogConfig] = useState<DialogConfig | null>(null);
  const [open, setOpen] = useState(false);

  const showDialog = (config: DialogConfig) => {
    setDialogConfig(config);
    setOpen(true);
  };

  const showAlert = (title: string, description: string) => {
    showDialog({
      type: 'alert',
      title,
      description
    });
  };

  const showConfirm = (
    title: string,
    description: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    showDialog({
      type: 'confirm',
      title,
      description,
      onConfirm,
      onCancel
    });
  };

  const showDelete = (
    title: string,
    description: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    showDialog({
      type: 'delete',
      title,
      description,
      onConfirm,
      onCancel,
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });
  };

  const showSuccess = (title: string, description: string) => {
    showDialog({
      type: 'success',
      title,
      description
    });
  };

  const DialogComponent = () => {
    if (!dialogConfig) return null;

    return (
      <CustomDialog
        open={open}
        onOpenChange={setOpen}
        {...dialogConfig}
      />
    );
  };

  return {
    showAlert,
    showConfirm,
    showDelete,
    showSuccess,
    DialogComponent
  };
};
