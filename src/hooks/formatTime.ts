const formatTime = (dateString: string) => {
    const dateObject = new Date(dateString)
    const year = dateObject.getFullYear()
    const mon = dateObject.getMonth() + 1
    const date = dateObject.getDate()
    const hour = dateObject.getHours()
    const min = dateObject.getMinutes()
    return `${year}.${mon}.${date} ${hour}:${min}`
}

function useTime () {
    return formatTime
}

export default useTime
