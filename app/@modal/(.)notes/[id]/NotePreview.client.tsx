'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal'; // Переконайся, що шлях вірний
import css from './NotePreview.module.css';

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  // Використовуємо useQuery, який підхопить дані з HydrationBoundary
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false, // Запобігає повторному запиту при монтуванні
  });

  const handleClose = () => router.back();

  if (isLoading) return <div className={css.loader}>Loading...</div>;
  if (isError || !note) return <div className={css.error}>Note not found</div>;

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <h2 className={css.title}>{note.title}</h2>
        
        {/* Відображаємо дату створення, як просив ментор */}
        <p className={css.date}>
          Created at: {new Date(note.createdAt).toLocaleDateString()}
        </p>

        <p className={css.content}>{note.content}</p>

        <div className={css.tag}>
          {/* Використовуємо note.tag (однина), як вказано в специфікації */}
          {note.tag && <span className={css.tag}>#{note.tag}</span>}
        </div>
      </div>
    </Modal>
  );
}