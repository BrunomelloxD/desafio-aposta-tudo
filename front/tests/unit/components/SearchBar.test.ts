import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from '~/components/common/SearchBar.vue'

describe('SearchBar', () => {
  it('deve renderizar corretamente', () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
        placeholder: 'Buscar teste'
      }
    })

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Buscar')
  })

  it('deve emitir evento de busca ao clicar no botão', async () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: 'teste' }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('search')).toBeTruthy()
  })

  it('deve emitir update:modelValue ao digitar', async () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: '' }
    })

    const input = wrapper.find('input')
    await input.setValue('novo valor')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('deve emitir busca ao pressionar Enter', async () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: 'teste' }
    })

    await wrapper.find('input').trigger('keyup.enter')
    expect(wrapper.emitted('search')).toBeTruthy()
  })

  it('deve renderizar seletor de limite quando showLimitSelector é true', () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
        showLimitSelector: true,
        limit: 10
      }
    })

    expect(wrapper.find('select').exists()).toBe(true)
  })

  it('não deve renderizar seletor de limite quando showLimitSelector é false', () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
        showLimitSelector: false
      }
    })

    expect(wrapper.find('select').exists()).toBe(false)
  })
})
