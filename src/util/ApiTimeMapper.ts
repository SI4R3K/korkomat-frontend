import type { UiTime } from "../types/time";

interface mapApiTimeProps {
    startTime: string,
    endTime: string,
}

function mapApiTime({
    startTime,
    endTime,
}: mapApiTimeProps): UiTime {
    const start = new Date(startTime)
    const end = new Date(endTime)
    const date = startTime.slice(0,10)

    return {
        date,
        dateLabel: new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'UTC',
        }).format(start),
        time: `${start.toLocaleTimeString([], 
                { 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    timeZone: 'UTC' }
                )} - ${end.toLocaleTimeString([], 
                        { 
                            hour: '2-digit', 
                            minute: '2-digit', 
                            timeZone: 'UTC' 
                        })
                    }`,
    }
}

export default mapApiTime