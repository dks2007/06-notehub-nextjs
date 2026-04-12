'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { Toaster } from 'react-hot-toast';
import { fetchNotes } from '../../lib/server-actions';
import SearchBox from '../../components/SearchBox/SearchBox';
import NoteList from '../../components/NoteList/NoteList';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './NotesPage.module.css';

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes(page, 12, search),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => {
    debouncedSetSearch(value);
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        <button className={css.button} onClick={handleOpenModal} type="button">
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.totalPages > 1 && (
        <Pagination pageCount={data.totalPages} currentPage={page} onPageChange={handlePageChange} />
      )}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <NoteForm onCancel={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}