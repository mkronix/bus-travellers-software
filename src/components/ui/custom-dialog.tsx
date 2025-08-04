
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertTriangle, Info, CheckCircle, Trash2 } from 'lucide-react';

interface CustomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'alert' | 'confirm' | 'delete' | 'success';
  title: string;
  description: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onOpenChange,
  type,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = 'OK',
  cancelText = 'Cancel'
}) => {
  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const getIcon = () => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-6 w-6 text-amber-500" />;
      case 'confirm':
        return <Info className="h-6 w-6 text-blue-500" />;
      case 'delete':
        return <Trash2 className="h-6 w-6 text-red-500" />;
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      default:
        return <Info className="h-6 w-6 text-blue-500" />;
    }
  };

  const isActionType = type === 'confirm' || type === 'delete';

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            {getIcon()}
            <AlertDialogTitle>{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {isActionType ? (
            <>
              <AlertDialogCancel onClick={handleCancel}>
                {cancelText}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirm}
                className={type === 'delete' ? 'bg-red-500 hover:bg-red-600' : ''}
              >
                {confirmText}
              </AlertDialogAction>
            </>
          ) : (
            <AlertDialogAction onClick={handleConfirm}>
              {confirmText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomDialog;
