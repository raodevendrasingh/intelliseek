export const getSessionClient = (userAgent: string) => {
    let os = "Unknown OS";
    let browser = "Unknown Browser";

    // Extract OS
    if (userAgent.includes("Linux")) {
        os = "Linux";
    } else if (userAgent.includes("Windows")) {
        os = "Windows";
    } else if (userAgent.includes("Mac OS")) {
        os = "macOS";
    }

    // Extract Browser
    if (userAgent.includes("Firefox/")) {
        browser = "Firefox";
    } else if (userAgent.includes("Chrome/")) {
        browser = "Chrome";
    } else if (
        userAgent.includes("Safari/") &&
        !userAgent.includes("Chrome/")
    ) {
        browser = "Safari";
    }

    return `${os} / ${browser}`;
};
