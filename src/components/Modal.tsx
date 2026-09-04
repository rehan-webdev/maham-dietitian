import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  routeKey: string;
  wide?: boolean;
  notification?: ReactNode;
}

export function Modal({ children, onClose, routeKey, wide, notification }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    dialog?.showModal();
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      const canRestoreFocus = previouslyFocused && previouslyFocused !== document.body && previouslyFocused.isConnected && getComputedStyle(previouslyFocused).visibility !== 'hidden';
      const focusTarget = canRestoreFocus ? previouslyFocused : document.querySelector<HTMLElement>('.brand-link');
      focusTarget?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const content = dialogRef.current?.querySelector('.modal-scroll');
    if (content) content.scrollTop = 0;
    const title = dialogRef.current?.querySelector<HTMLElement>('#modal-title');
    title?.focus({ preventScroll: true });
  }, [routeKey]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className={`site-dialog ${wide ? 'site-dialog-wide' : ''}`}
      aria-labelledby="modal-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div className="modal-frame" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <button ref={closeRef} className="modal-close icon-button" aria-label="Close window" onClick={onClose}>
          <X size={21} strokeWidth={1.5} />
        </button>
        <div className="modal-scroll">{children}</div>
        <div className="modal-toast-region" aria-live="polite" aria-atomic="true">{notification}</div>
      </motion.div>
    </dialog>,
    document.body,
  );
}