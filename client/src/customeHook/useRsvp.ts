import { useCallback } from 'react';
import { requestHandler } from '../utils';
import { handleRSVP, removeRsvp, checkRsvp } from '../api/event';

export default function useRsvp(streamId: string, setIsRsvp: (value: boolean) => void, setIsLoading: (value: boolean) => void, setQrCodeUrl: (value: string) => void){

  const checkRsvpStatus = useCallback(async () => {
    // e.preventDefault();
    await requestHandler(
        async () => await checkRsvp(streamId),
        setIsLoading,
        (res) => {
          const { data } = res;
          setIsRsvp(data);
          console.log("This is the checked data: ", data);
        },
        (error) => {
          console.log(error);
        }
    )
  },[setIsLoading, setIsRsvp, streamId])

  const handleRsvp = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    await requestHandler(
        async () => await handleRSVP(streamId),
        setIsLoading,
        (data) => {
          setQrCodeUrl(data.data.qrCodeUrl);
          checkRsvpStatus();
        },
        (error) => {
          console.log(error);
        }
    )
  }, [setIsLoading, streamId, checkRsvpStatus]);

  const handleRemoveRsvp = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    await requestHandler(
        async () => await removeRsvp(streamId),
        setIsLoading,
        () => {
          checkRsvpStatus();
        },
        (error) => {
          console.log(error);
        }
    )
  }, [setIsLoading, streamId, checkRsvpStatus]);

  return { handleRsvp, handleRemoveRsvp, checkRsvpStatus };
}