interface IpApiResponse {
    status: "success" | "fail";
    message?: string;
    city: string;
    country: string;
}

interface IpLocation {
    city?: string;
    country?: string;
    error?: string;
}

export async function getLocationFromIp(ip: string): Promise<IpLocation> {
    if (ip === "::1" || ip === "::ffff:127.0.0.1" || ip === "127.0.0.1") {
        return {
            city: "Local",
            country: "This Device",
        };
    }

    try {
        const response = await fetch(`http://ip-api.com/json/${ip}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: IpApiResponse = await response.json();

        if (data.status === "success") {
            return {
                city: data.city,
                country: data.country,
            };
        }

        return {
            error: data.message || "Location not found",
        };
    } catch (error) {
        return {
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to fetch location",
        };
    }
}
