import { StatefulTabs, StatefulTabsProps } from 'baseui/tabs'

function AppTabs (props: Partial<StatefulTabsProps>) {
    const { children, ...rest }  = props

    const tabStyle = ({$active, $disabled, $theme}: any) => ({
        color: $active ? '#272928' : '#7b7c7b',
        fontWeight: $active ? 600 : 'normal',
        fontSize: '16px',
        paddingTop: '0',
        paddingBottom: '0',
        borderBottom: '0',
        position: 'relative',
        '::before': $active
            ? {
                content: "''",
                left: '50%',
                bottom: 0,
                width: '16px',
                height: '6px',
                position: 'absolute',
                borderRadius: '9px',
                background: $theme.colors.primaryB,
                transform: 'translate(-50%,124%)'
            }
            : {},
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
                    style: { color: 'red',  backgroundColor: 'none', paddingTop: 0, paddingBottom: 0, paddingLeft: '0', paddingRight: '0'  },
                },
                Tab: { style: tabStyle },
                TabContent: { style: { paddingTop: '20px', paddingLeft: '12px', paddingRight: '12px' } }

            }}>
            { children }
        </StatefulTabs>
    )
}

export default AppTabs
