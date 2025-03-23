import { getData } from '@/services/default'
import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import VehiculeCountingView from '../VehiculeCountingView.vue'

vi.mock('@/services/default', () => ({
  getData: vi.fn(),
}))

describe('vehiculeCountingView', () => {
  beforeEach(() => {
    const hourlyAverages = Object.fromEntries(
      Array.from({ length: 24 }, (_, i) => [i.toString(), i]),
    )
    vi.mocked(getData).mockResolvedValue({
      hourlyAverages,
      hourWithHighestAverage: { time: '12', value: 23 },
      hourWithLowestAverage: { time: '0', value: 0 },
      overallHourlyAverage: 11.5,
    })
  })

  it('displays the graph after data loading', async () => {
    const wrapper = mount(VehiculeCountingView)
    await flushPromises()

    expect(wrapper.findComponent({ name: 'AppSpinner' }).exists()).toBe(false)
    expect(wrapper.find('canvas').exists()).toBe(true)
  })

  it('displays the highest average hour', async () => {
    const wrapper = mount(VehiculeCountingView)
    await flushPromises()
    expect(wrapper.text()).toContain('23')
  })

  it('displays the lowest average hour', async () => {
    const wrapper = mount(VehiculeCountingView)
    await flushPromises()
    expect(wrapper.text()).toContain('0')
  })

  it('displays the overall average', async () => {
    const wrapper = mount(VehiculeCountingView)
    await flushPromises()
    expect(wrapper.text()).toContain('11.5')
  })

  it('displays the average by hour', async () => {
    const wrapper = mount(VehiculeCountingView)
    await flushPromises()
    expect(wrapper.text()).toContain('0')
    expect(wrapper.text()).toContain('23')
  })

  it('renders a message when bar chart data is not available', async () => {
    vi.mocked(getData).mockResolvedValueOnce({
      hourlyAverages: null,
      hourWithHighestAverage: { time: '12', value: 23 },
      hourWithLowestAverage: { time: '0', value: 0 },
      overallHourlyAverage: 11.5,
    })

    const wrapper = mount(VehiculeCountingView)
    await flushPromises()

    const noDataMessage = wrapper.find('[data-test="bar-chart-no-data-message"]')

    expect(noDataMessage.exists()).toBe(true)
    expect(noDataMessage.text()).toContain('No data available')
  })
})
