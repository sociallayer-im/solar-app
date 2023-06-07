import {useContext, useEffect, useState} from 'react'
import './IssueTypeSelectorBadge.less'
import Toggle from "../../base/Toggle/Toggle";
import IssuesInput from "../../base/IssuesInput/IssuesInput";
import AppButton from "../../base/AppButton/AppButton";
import LangContext from "../../provider/LangProvider/LangContext";

export type IssueType = '' | 'issue' | 'presend'

export interface IssueTypeSelectorData {
    issues: string[],
    issueType: IssueType,
    presendAmount: string
}

export interface IssueTypeSelectorProps {
    onConfirm?: (value: IssueTypeSelectorData) => any
    onCancel?: (value: IssueTypeSelectorData) => any
    initIssueType?: IssueType
    initIssues?: string[]
    initPresendAmount?: string
}

function IssueTypeSelectorBadge(props: IssueTypeSelectorProps) {
    const [issueType, setIssueType] = useState<'' | 'issue' | 'presend'>(props.initIssueType || '')
    const [presendAmount, setPresendAmount] = useState(props.initPresendAmount || '30')
    const [issues, setIssues] = useState<string[]>(props.initIssues || [''])
    const {lang} = useContext(LangContext)

    // 修改presendAmount,只能是数字
    const handlePresendAmountChange = (e: any) => {
        let value = e.target.value.trim()
        if (!value) {
            setPresendAmount('0')
            return
        }

        if (value.startsWith('0')) {
            value = value.replace(/^0+/, '')
        }

        const reg = /^[0-9]*$/
        if (reg.test(value)) {
            setPresendAmount(value)
        }
    }

    return (<div className={'issue-type-select'}>
        <div className={'title'}>Send the badge</div>
        {(issueType === '' || issueType === 'issue') &&
            <div className={'item'}>
                <div className={'item-title'}>Select receivers</div>
                <Toggle checked={issueType === 'issue'} onChange={e => {
                    setIssueType(issueType === 'issue' ? '' : 'issue')
                }}/>
            </div>
        }

        {
            issueType === 'issue' &&
            <IssuesInput
                value={issues}
                onChange={(newIssues) => {
                    setIssues(newIssues)
                }}/>
        }

        {(issueType === '' || issueType === 'presend') &&
            <div className={'item'}>
                <div className={'item-title'}>Badge amount</div>
                <div className={'item-value'}>
                    {issueType === 'presend' &&
                        <input value={presendAmount} onChange={handlePresendAmountChange}/>
                    }
                    <Toggle checked={issueType === 'presend'} onChange={e => {
                        setIssueType(issueType === 'presend' ? '' : 'presend')
                    }}/>
                </div>
            </div>
        }

        <div className={'actions'}>
            <AppButton
                kind={'primary'}
                onClick={() => {
                    props.onConfirm && props.onConfirm({
                        presendAmount,
                        issues,
                        issueType
                    })
                }}
                size={'compact'}>{lang['IssueBadge_Mint']}</AppButton>
            <div
                onClick={e => {
                    props.onCancel && props.onCancel({
                        presendAmount,
                        issues,
                        issueType
                    })
                }}
                className={'send-later'}
            >{lang['IssueBadge_Mint_later']}</div>
        </div>
    </div>)
}

export default IssueTypeSelectorBadge
