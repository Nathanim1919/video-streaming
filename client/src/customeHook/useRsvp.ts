import { useCallback } from 'react';
import { requestHandler } from '../utils';
import { eventApi } from '../api';

interface RsvpResponse {
  data: {
    qrCodeUrl: string;
    // Include other properties of `data.data` here
  };
  // Include other properties of `data` here if needed
}

export default function useRsvp(streamId: string, setIsRsvp: (value: boolean) => void, setIsLoading: (value: boolean) => void, setQrCodeUrl: (value: string) => void){

  const checkRsvpStatus = useCallback(async () => {
    // e.preventDefault();
    await requestHandler(
        async () => await eventApi.checkRsvp(streamId),
        setIsLoading,
        (res) => {
          const { data } = res;
          setIsRsvp(data as boolean);
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
          const rsvpData = data.data as RsvpResponse["data"];
          setQrCodeUrl(rsvpData.qrCodeUrl as string);
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