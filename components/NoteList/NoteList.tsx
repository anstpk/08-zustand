'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import { Note } from '@/types/note';
import Link from 'next/link';
import css from './NoteList.module.css';

// Створюємо окремий інтерфейс (Вимога ментора)
interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <Link href={`/notes/${note.id}`} className={css.link}>
            <div className={css.header}>
              <h3 className={css.title}>{note.title}</h3>
               {/* Відображаємо тег (Вимога ментора) */}
              <span className={css.tag}>{note.tag && note.tag}</span>
            </div>
            <p className={css.content}>{note.content}</p>
          </Link>
          <button 
            className={css.deleteBtn} 
            onClick={() => mutation.mutate(note.id)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Deleting...' : 'Delete'}
          </button>
        </li>
      ))}
    </ul>
  );
}