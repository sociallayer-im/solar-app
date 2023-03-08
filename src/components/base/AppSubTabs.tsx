import { StatefulTabs, StatefulTabsProps } from 'baseui/tabs'

function AppSubTabs (props: Partial<StatefulTabsProps>) {
    const { children, ...rest }  = props

    const tabStyle = ({$active, $disabled, $theme}: any) => ({
        color: $active ? '#272928' : '#7b7c7b',
        fontWeight: $active ? 600 : 'normal',
        height: '32px',
        lineHeight: '32px',
        borderRadius: '32px',
        paddingLeft: '15px',
        paddingRight: '15px',
        backgroundColor: $active ? '#befde7' : '#ecf2ee',
        fontSize: '14px',
        paddingTop: '0',
        paddingBottom: '0',
        borderBottom: '0',
        position: 'relative',
        ':hover': $disabled
            ? {}
            : {
                color: '#272928',
            },
        ':focus': $disabled
            ? {}
            : {
                color: '#272928',
            },
    })

    return (
        <StatefulTabs
            { ...rest }
            overrides={{
                TabBar: {
                    style: { paddingTop: 0, backgroundColor: 'none', paddingBottom: 0, paddingLeft: '0', marginLeft: '-5px' },
                },
                Tab: { style: tabStyle },
                TabContent: { style: { paddingTop: '12px', paddingLeft: 0, paddingRight: 0 } }
            }}>
            { children }
        </StatefulTabs>
    )
}

export default AppSubTabs
