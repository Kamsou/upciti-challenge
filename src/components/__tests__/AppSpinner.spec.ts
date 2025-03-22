import AppSpinner from '@/components/generic/AppSpinner.vue'

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('appSpinner', () => {
  it('renders properly', () => {
    const wrapper = mount(AppSpinner)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('have an animation', () => {
    const wrapper = mount(AppSpinner)
    expect(wrapper.find('svg').classes()).toContain('animate-spin')
  })
})
