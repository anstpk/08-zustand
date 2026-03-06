'use client';

import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  onPageChange: (page: number) => void;
  currentPage: number;
}

export default function Pagination({ pageCount, onPageChange, currentPage }: PaginationProps) {
  // Якщо сторінка всього одна, пагінацію краще не показувати
  if (pageCount <= 1) return null;

  return (
    <div className={css.paginationWrapper}>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={(event) => onPageChange(event.selected + 1)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        forcePage={currentPage - 1} // Синхронізація з поточним стейтом
        
        // Класи для стилізації (можна змінити на свої)
        containerClassName={css.container}
        pageClassName={css.pageItem}
        pageLinkClassName={css.pageLink}
        previousClassName={css.pageItem}
        previousLinkClassName={css.pageLink}
        nextClassName={css.pageItem}
        nextLinkClassName={css.pageLink}
        activeClassName={css.active}
        disabledClassName={css.disabled}
      />
    </div>
  );
}