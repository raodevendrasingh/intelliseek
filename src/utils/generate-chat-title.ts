export const createChatTitle = (content: string) => {
    const cleanedContent = content.replace(/[^\w\s]/g, "").toLowerCase();

    const stopWords = new Set(["the", "is", "and", "of", "in", "to", "a"]);
    const words = cleanedContent
        .split(" ")
        .filter((word) => !stopWords.has(word) && word.length > 0);

    const title = words.slice(0, 4).join(" ");

    return title
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};
