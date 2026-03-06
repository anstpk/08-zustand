'use client';

import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Link from 'next/link'; // Додаємо Link для навігації
import css from './NotesPage.module.css';

export default function NotesClient({ tag }: { tag?: string }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  
  const [debouncedSearch] = useDebounce(search, 300);

  // Скидаємо сторінку на першу, якщо змінився тег фільтрації або пошук
  useEffect(() => {
    setPage(1);
  }, [tag, debouncedSearch]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () => fetchNotes(page, 12, debouncedSearch, tag),
    placeholderData: keepPreviousData,
  });

  if (error) return <p className={css.error}>Error loading notes.</p>;

  return (
    <div className={css.container}>
      <header className={css.header}>
        <SearchBox 
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }} 
        />
        
        {/* ВАЖЛИВО: Замінюємо кнопку з модалкою на посилання за ТЗ */}
        <Link href="/notes/action/create" className={css.addBtn}>
          Create note +
        </Link>
      </header>

      {isLoading ? (
        <p className={css.loading}>Loading notes...</p>
      ) : (
        <>
          <NoteList notes={data?.notes || []} />
          
          {data?.totalPages && data.totalPages > 1 && (
            <Pagination 
  pageCount={data.totalPages} 
  onPageChange={(selectedPage: number) => setPage(selectedPage)} 
  currentPage={page} 
/>
          )}
        </>
      )}
      
      {/* Модалку видалено, оскільки тепер форма створення на окремій сторінці */}
    </div>
  );
}