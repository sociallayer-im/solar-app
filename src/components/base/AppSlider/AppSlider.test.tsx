import { render, screen, userEvent } from '../../../test/test-utils'
import AppSlider from './AppSlider'

describe('AppSlider', async () => {
    it('正常渲染', () => {
        render(<AppSlider value={[1]} step={0.1} range={1} />)
        expect(screen.getByTestId('AppSlider')).toBeInTheDocument()
    })
})
