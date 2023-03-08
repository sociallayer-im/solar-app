import {useEffect, useRef, useState} from 'react'
import { useInView } from 'react-intersection-observer'

interface useScrollToLoadProps {
    queryFunction: (page: number) => any[] | Promise<any[]>
}

function useScrollToLoad (props: useScrollToLoadProps) {
    const [list, setList] = useState<any[]>([])
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    const hasMore = useRef(true)
    const { ref, inView } = useInView({
        threshold: 0
    })


    const query = async (init = false) => {
        const isInit = page === 1
        setLoading(true)

        try {
            const newData = await props.queryFunction(page)
            if (!newData.length) {
                hasMore.current = false
            }

            if ( isInit && !newData.length) {
                setIsEmpty(true)
            }
            setList((pre) => {
                return isInit ? newData : [...pre, ...newData]
            } )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (page) {
            query()
        }
    }, [page])

    useEffect(() => {
        if (inView && hasMore.current && !loading) {
            setPage((pre) => pre + 1)
        }
    }, [inView])

    const refresh = () => {
        setIsEmpty(false)
        hasMore.current = true
        setList([])
        setPage(0)
        setTimeout(() => {
            setPage(1)
        }, 300)
    }

    return {
        page,
        loading,
        isEmpty,
        list,
        ref,
        inView,
        refresh
    }
}

export default useScrollToLoad
