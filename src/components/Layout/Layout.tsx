import PageHeader from '../compose/PageHeader'
import { useStyletron } from 'baseui'

function Layout(props?: any) {
    const [css] = useStyletron()
    const styled = {
        paddingTop: '48px',
        width: '100%'
    }
    return (
        <>
            <PageHeader />
            <div className={ css(styled )}>
                {props.children}
            </div>
        </>
    )
}

export default Layout
