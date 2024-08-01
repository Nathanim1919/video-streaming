import React, { useCallback } from "react";
import { requestHandler } from "../utils";
import { authApi } from "../api";


export default function useFollow(
    userId: string, 
    isFollow: boolean, 
    setIsFollow: (value: boolean) => void, 
    setIsLoading: (value: boolean) => void, 
    setUserFollowers: (value: number | ((prev: number) => number)) => void
){
    const handleFollowClick = useCallback(async (e:React.MouseEvent) => {
        e.preventDefault()
        await requestHandler(
            async () => await authApi.handleFollow(userId),
            setIsLoading,
            () => {
                setIsFollow(true);
                setUserFollowers((prev) => prev + 1);
            },
            (error) => {
                console.log(error);
            }
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setIsFollow, userId]);

    const handleUnfollowClick = useCallback(async (e: React.MouseEvent) => {
        e.preventDefault()
        await requestHandler(
            async () => await authApi.handleUnFollow(userId),
            setIsLoading,
            () => {
                setIsFollow(false);
                setUserFollowers((prev) => prev - 1);
            },
            (error) => {
                console.log(error);
            }
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[setIsFollow, userId]);

    const handleClick = useCallback((e: React.MouseEvent) => {
        if (isFollow) {
            handleUnfollowClick(e);
        } else {
            handleFollowClick(e);
        }
    },[isFollow, handleFollowClick, handleUnfollowClick]);

    return handleClick;
}