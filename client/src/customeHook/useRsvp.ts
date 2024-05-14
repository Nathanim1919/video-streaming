import { useCallback } from 'react';
import { requestHandler } from '../utils';
import { handleRSVP, removeRsvp } from '../api/event';

export default function useRsvp(streamId: string, isRsvp: boolean, setIsRsvp: (value: boolean) => void, setIsLoading: (value: boolean) => void) {
  const handleRsvp = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    await requestHandler(
        async () => await handleRSVP(streamId),
        setIsLoading,
        (response) => {
          console.log(response.data);
          setIsRsvp(true);
        },
        (error) => {
          console.log(error);
        }
    )
  }, [streamId, setIsRsvp, setIsLoading]);

  const handleRemoveRsvp = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    await requestHandler(
        async () => await removeRsvp(streamId),
        setIsLoading,
        (response) => {
          console.log(response.data);
          setIsRsvp(false);
        },
        (error) => {
          console.log(error);
        }
    )
  }, [streamId, setIsRsvp, setIsLoading]);

  const handleRsvpClick = useCallback((e: React.MouseEvent) => {
    if (isRsvp) {
      handleRemoveRsvp(e);
    } else {
      handleRsvp(e);
    }
  }, [isRsvp, handleRemoveRsvp, handleRsvp]);

  return handleRsvpClick;
}