import { shallowMount } from '@vue/test-utils';
import BackOffice from '@/components/BackOffice.vue';
import { createStore } from 'vuex';

// Mock fetch globalement
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

describe('BackOffice.vue', () => {
  let store;

  beforeEach(() => {
    store = createStore({
      state: {
        user: { email: 'test@example.com' },
      },
      getters: {
        isAuthenticated: () => true,
      },
    });
  });

  it('rend correctement la page Back-Office lorsque l’utilisateur est authentifié', () => {
    const wrapper = shallowMount(BackOffice, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find('h1').text()).toBe('Back-Office');
    expect(wrapper.text()).toContain('Vous êtes connecté en tant que : test@example.com');
  });
});
