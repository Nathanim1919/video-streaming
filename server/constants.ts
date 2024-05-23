/**
 * @type {{GOOGLE: "GOOGLE"; GITHUB: "GITHUB"; LINKEDIN: "LINKEDIN";}}
 */

export const userLoginTypes = {
    GOOGLE: 'GOOGLE',
    GITHUB: 'GITHUB',
    LINKEDIN: 'LINKEDIN',
    EMAIL_PASSWORD: "EMAIL_PASSWORD",
};

export const AvailableSocialLogins = Object.values(userLoginTypes);


export const numberOfFreeLiveStreams: number = 3;  // 3 free live streams for each user

