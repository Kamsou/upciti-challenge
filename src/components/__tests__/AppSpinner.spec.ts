import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppSpinner from '../AppSpinner.vue'

describe('AppSpinner', () => {
  it('renders properly', () => {
    const wrapper = mount(AppSpinner)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('have an animation', () => {
    const wrapper = mount(AppSpinner)
    expect(wrapper.find('svg').classes()).toContain('animate-spin')
  })
})
