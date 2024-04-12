export const getTitle = (tags: string | undefined | null) => {
    if (!tags) return '';

    const tagParts = tags.split(', ');
    if (tagParts.length < 2) return '';

    return tagParts[1].charAt(0).toUpperCase() + tagParts[1].slice(1);
}