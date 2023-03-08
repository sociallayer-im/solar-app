import LangContext from './LangContext'
import en, { LangConfig } from "./en"
import cn from "./cn"
import { ReactNode, useEffect, useState } from "react";
import { LangType } from "../../../hooks/lang/lang";

export interface LangProviderProps {
    children? : ReactNode
}

function LangProvider (props: LangProviderProps) {
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
        window.localStorage.setItem('lang', langType)
    }

    useEffect(() => {
        const storageLang = window.localStorage.getItem('lang')
        if (storageLang === LangType.en) {
            switchLang(LangType.en)
        }
        if (storageLang === LangType.cn) {
            switchLang(LangType.cn)
        }
    }, [])

   return (
       <LangContext.Provider value={{ langType, lang, switchLang }}>
           { props.children }
       </LangContext.Provider>
   )
}

export default LangProvider
