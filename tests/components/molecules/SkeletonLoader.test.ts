import { describe, expect, it } from "vitest";
import { shallowMount } from '@vue/test-utils';
import SkeletonLoader from '@/components/molecules/SkeletonLoader.vue';

describe('SkeletonLoader', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(SkeletonLoader);
    expect(wrapper.exists()).toBe(true);
  });
});