import React, { useCallback } from "react";
import { requestHandler } from "../utils";
import { handleFollow, handleUnFollow } from "../api";


export default function useFollow(userId: string, isFollow: boolean, setIsFollow: (value: boolean) => void, setIsLoading: (value: boolean) => void) {
    const handleFollowClick = useCallback(async (e:React.MouseEvent) => {
        e.preventDefault()
        await requestHandler(
            async () => await handleFollow(userId),
            setIsLoading,
            () => {
                setIsFollow(true);
            },
            (error) => {
                console.log(error);
            }
        )
    }, [setIsLoading, setIsFollow, userId]);

    const handleUnfollowClick = useCallback(async (e: React.MouseEvent) => {
        e.preventDefault()
        await requestHandler(
            async () => await handleUnFollow(userId),
            setIsLoading,
            () => {
                setIsFollow(false);
            },
            (error) => {
                console.log(error);
            }
        )
    },[setIsLoading, setIsFollow, userId]);

    const handleClick = useCallback((e: React.MouseEvent) => {
        if (isFollow) {
            handleUnfollowClick(e);
        } else {
            handleFollowClick(e);
        }
    },[isFollow, handleFollowClick, handleUnfollowClick]);

    return handleClick;
}