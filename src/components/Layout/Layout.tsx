import PageHeader from '../compose/PageHeader'
import { useStyletron } from 'baseui'

function Layout(props?: any) {
    const [css] = useStyletron()
    const wrapper = {
        width: '100%',
        maxHeight: 'fill-available',
        display: 'flex',
        flexDirection: 'column' as const,
        overflow: 'hidden'
    }
    const content = {
        width: '100%',
        flex: 1,
        overflow: 'auto'
    }

    return (
        <div className={ css(wrapper) } style={{height: '100vh'}}>
            <PageHeader />
            <div className={ css(content)}>
                {props.children}
            </div>
        </div>
    )
}

export default Layout
