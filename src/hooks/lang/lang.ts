import { useState, useEffect } from 'react'
import en, { LangConfig } from './en'
import cn from './cn'


export enum LangType {
    cn='cn',
    en='en'
}

function useLang () {
    const langPackage = {
        en,
        cn
    }

    const [langType, setLangType] = useState(LangType.en)
    const [lang, setLang] = useState(() => {
        return langPackage[langType] as LangConfig
    })

    const switchLang = (langType: LangType) => {
        setLangType(langType)
        setLang(langPackage[langType])
    }

    useEffect(() => {
        const userLang = window.localStorage.getItem('lang') || 'en'
        switchLang(userLang as LangType)
    },[])

    return { lang, switchLang, langType }
}

export default useLang
