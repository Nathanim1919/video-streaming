import { useCallback } from 'react';
import { requestHandler } from '../utils';
import { eventApi } from '../api';

export default function useRsvp(streamId: string, setIsRsvp: (value: boolean) => void, setIsLoading: (value: boolean) => void, setQrCodeUrl: (value: string) => void){

  const checkRsvpStatus = useCallback(async () => {
    // e.preventDefault();
    await requestHandler(
        async () => await eventApi.checkRsvp(streamId),
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
        async () => await eventApi.handleRSVP(streamId),
        setIsLoading,
        (data) => {
          setQrCodeUrl(data?.data.qrCodeUrl);
          checkRsvpStatus();
        },
        (error) => {
          console.log(error);
        }
    )
  }, [setIsLoading, streamId, setQrCodeUrl, checkRsvpStatus]);

  const handleRemoveRsvp = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    await requestHandler(
        async () => await eventApi.removeRsvp(streamId),
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