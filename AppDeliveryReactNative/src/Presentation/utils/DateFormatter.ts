
export const DateFormatter = (timestamp: string): string => {
    const date = new Date(timestamp)
    const formatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
    return formatter.format(date)
}