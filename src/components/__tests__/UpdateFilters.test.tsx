import { render, fireEvent } from '@testing-library/react'
import UpdateFilters from '../UpdateFilters'

describe('UpdateFilters', () => {
    it('calls callbacks when filters change', () => {
        const onFilterChange = vi.fn()
        const onStartDateChange = vi.fn()
        const onEndDateChange = vi.fn()
        const onClear = vi.fn()

        const utils = render(
            <UpdateFilters
                filter=""
                startDate=""
                endDate=""
                onFilterChange={onFilterChange}
                onStartDateChange={onStartDateChange}
                onEndDateChange={onEndDateChange}
                onClear={onClear}
            />
        )

        fireEvent.change(utils.getByPlaceholderText(/Search update/i), {
            target: { value: 'test' }
        })
        expect(onFilterChange).toHaveBeenCalledWith('test')

        const inputs = utils.container.querySelectorAll('input[type="date"]')
        fireEvent.change(inputs[0], { target: { value: '2024-05-01' } })
        expect(onStartDateChange).toHaveBeenCalledWith('2024-05-01')

        fireEvent.change(inputs[1], { target: { value: '2024-05-10' } })
        expect(onEndDateChange).toHaveBeenCalledWith('2024-05-10')
    })
})
