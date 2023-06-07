import { useNavigate, useSearchParams } from 'react-router-dom'
import {useContext, useEffect, useState} from "react";
import solas, {Group, Profile} from "../../service/solas";
import UserContext from "../../components/provider/UserProvider/UserContext";
import DialogsContext from "../../components/provider/DialogProvider/DialogsContext";
import useVerify from "../../hooks/verify";
import LangContext from "../../components/provider/LangProvider/LangContext";
import Layout from "../../components/Layout/Layout";
import PageBack from "../../components/base/PageBack";
import AppInput from "../../components/base/AppInput";
import ReasonInput from "../../components/base/ReasonInput/ReasonInput";
import SelectCreator from "../../components/compose/SelectCreator/SelectCreator";
import AppButton, {BTN_KIND} from "../../components/base/AppButton/AppButton";
import SelectPointCover, {covers} from "../../components/compose/SelectPointCover/SelectPointCover";
import './CreatePoint.less'

function CreateBadge() {
    const navigate = useNavigate()
    const [cover, setCover] = useState(covers[0])
    const [name, setName] = useState('')
    const [symbol, setSymbol] = useState('PT')
    const [nameError, setNameError] = useState('')
    const [symbolError, setSymbolError] = useState('')
    const [reason, setReason] = useState('')
    const [creator, setCreator] = useState<Group | Profile | null>(null)
    const { user } = useContext(UserContext)
    const { showLoading, showToast } = useContext(DialogsContext)
    const [searchParams, _] = useSearchParams()
    const presetAcceptor = searchParams.get('to')
    const { lang } = useContext(LangContext)

    const handleCreate = async () => {
        console.log('cover', cover)
        console.log('name', name)
        console.log('symbol', symbol)
        console.log('creator', creator)
    }

    return (
        <Layout>
            <div className='create-point-page'>
                <div className='create-badge-page-wrapper'>
                    <PageBack title={ lang['Create_Point_Title'] }/>

                    <div className='create-badge-page-form'>
                        <div className='input-area'>
                            <div className='input-area-title'>{ lang['Create_Point_Image'] }</div>
                            <SelectPointCover
                                value={ cover }
                                onChange={ (value) => { setCover(value) }} />
                        </div>

                        <div className='input-area'>
                            <div className='input-area-title'>{ lang['Create_Point_Name'] }</div>
                            <AppInput
                                errorMsg={nameError}
                                clearable
                                maxLength={ 30 }
                                value={ name }
                                endEnhancer={() => <span style={ { fontSize: '12px', color: '#999' } }>
                                    { `${name.length}/30` }
                                </span>
                                }
                                placeholder={ lang['Create_Point_Name_Placeholder'] }
                                onChange={ (e) => {setName(e.target.value.trim()) } } />
                        </div>

                        <div className='input-area'>
                            <div className='input-area-title'>{ lang['Create_Point_Symbol'] }</div>
                            <AppInput
                                errorMsg={symbolError}
                                clearable
                                maxLength={ 10 }
                                value={ symbol }
                                endEnhancer={() => <span style={ { fontSize: '12px', color: '#999' } }>
                                    { `${name.length}/10` }
                                </span>
                                }
                                placeholder={ lang['Create_Point_Symbol_Placeholder'] }
                                onChange={ (e) => {setSymbol(e.target.value.trim().toUpperCase()) } } />
                        </div>

                        <div className='input-area'>
                            <div className='input-area-title'>{ lang['IssueBadge_Reason'] }</div>
                            <ReasonInput value={reason}  onChange={ (value) => { setReason(value) }} />
                        </div>

                        <div className='input-area'>
                            <div className='input-area-title'>{ lang['BadgeDialog_Label_Creator'] }</div>
                            <SelectCreator value={ creator } onChange={(res) => { console.log('resres', res);setCreator(res) }}/>
                        </div>

                        <AppButton kind={ BTN_KIND.primary }
                                   special
                                   onClick={ () => { handleCreate() } }>
                            { presetAcceptor
                                ? lang['MintBadge_Submit_To']([presetAcceptor.split('.')[0]])
                                : lang['MintBadge_Next']
                            }
                        </AppButton>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateBadge
