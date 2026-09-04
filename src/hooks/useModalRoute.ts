import { useCallback, useEffect, useState } from 'react';
import { articles, programs } from '../data/content';
import type { ModalRoute } from '../types';

function readRoute(): ModalRoute | null {
  const params = new URLSearchParams(window.location.search);
  const type = params.get('view');
  const id = params.get('id');
  if (type === 'article' && articles.some((article) => article.id === id)) {
    return { type, id: id! };
  }
  if (type === 'program' && programs.some((program) => program.id === id)) {
    return { type, id: id! };
  }
  if (type === 'journal' || type === 'guide' || type === 'planner' || type === 'quiz' || type === 'about' || type === 'privacy' || type === 'terms') {
    return { type };
  }
  return null;
}

export function modalUrl(route: ModalRoute): string {
  const url = new URL(window.location.href);
  url.searchParams.set('view', route.type);
  if ('id' in route) url.searchParams.set('id', route.id);
  else url.searchParams.delete('id');
  return url.toString();
}

export function useModalRoute() {
  const [modal, setModal] = useState<ModalRoute | null>(readRoute);

  useEffect(() => {
    const sync = () => setModal(readRoute());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const openModal = useCallback((route: ModalRoute) => {
    // A modal is one history entry, even when navigating between its views.
    const method = modal ? 'replaceState' : 'pushState';
    window.history[method]({ mahamModal: true }, '', modalUrl(route));
    setModal(route);
  }, [modal]);

  const closeModal = useCallback(() => {
    if (window.history.state?.mahamModal) {
      window.history.back();
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete('view');
      url.searchParams.delete('id');
      window.history.replaceState(null, '', url);
    }
    setModal(null);
  }, []);

  return { modal, openModal, closeModal };
}