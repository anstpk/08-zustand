'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Link from 'next/link';
import css from './NoteDetails.module.css';

export default function NoteDetailsClient() {
  const params = useParams();
  const id = params?.id as string;

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false, // Вимога ментора: не робити повторний запит при фокусі
    enabled: !!id, // Запит не піде, поки немає id
  });

  if (isLoading) return <div className={css.loader}>Loading note details...</div>;
  
  if (error || !note) return (
    <div className={css.error}>
      <p>Note not found or deleted.</p>
      <Link href="/notes">Back to list</Link>
    </div>
  );

  return (
    <article className={css.noteDetails}>
      <Link href="/notes" className={css.backLink}>← Back to all notes</Link>
      
      <header className={css.header}>
        <h1 className={css.title}>{note.title}</h1>
        {note.tag && <span className={css.tag}>{note.tag}</span>}
      </header>

      <div className={css.content}>
        {note.content}
      </div>

      <footer className={css.footer}>
        <p>Created at: {new Date(note.createdAt).toLocaleDateString()}</p>
      </footer>
    </article>
  );
}