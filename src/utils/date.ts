export const formatDate = (dateString: string) => {
    const date = new Date(dateString ?? new Date());
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    return `${month} ${day}일`;
};
