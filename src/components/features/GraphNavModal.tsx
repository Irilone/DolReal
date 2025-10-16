// src/components/features/GraphNavModal.tsx
'use client';
import { Dialog } from '@/components/ui/dialog';

interface GraphNavModalProps {
  embedUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

export function GraphNavModal({ embedUrl, isOpen, onClose }: GraphNavModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <Dialog>
      <div>
        <iframe src={embedUrl} width="100%" height="600"></iframe>
        <button onClick={onClose}>Close</button>
      </div>
    </Dialog>
  );
}
