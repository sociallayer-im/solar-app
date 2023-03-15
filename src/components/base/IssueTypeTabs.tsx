import { StatefulTabs, TabsProps, Tabs } from 'baseui/tabs'

function AppTabs (props: Partial<TabsProps>) {
    const { children, ...rest }  = props

    const tabStyle = ({$active, $disabled, $theme}: any) => ({
        fontSize: '14px',
        paddingTop: '8px',
        paddingBottom: '8px',
        width: '50%',
        borderRadius: '7px',
        borderBottom: '0',
        position: 'relative',
        textAlign: 'center',
        background: $active ? '#fff' : 'none',
        boxShadow:  $active ? '0 0 4px rgb(0 0 0 / 5%)' : 'none'
    })

    return (
        <Tabs
            { ...rest }
            overrides={{
                TabBar: {
                    style: {
                        backgroundColor: '#f8f8f8',
                        paddingTop:'8px',
                        paddingBottom:'8px',
                        paddingLeft: '4px',
                        paddingRight: '4px',
                        borderRadius: '7px'
                    },
                },
                Tab: { style: tabStyle },
                TabContent: { style: { paddingTop: '8px', paddingLeft: '0', paddingRight: '0' } }

            }}>
            { children }
        </Tabs>
    )
}

export default AppTabs
