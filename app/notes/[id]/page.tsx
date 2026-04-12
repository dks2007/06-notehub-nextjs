import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/server-actions';
import NoteDetailsClient from './NoteDetails.client';

interface NoteDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
  const { id } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}