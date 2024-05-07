import { defineStore } from 'pinia';
import type { MainStore, Topic } from '../types';

export const useMainStore = defineStore('MainStore', {
  state: () => {
    return {
      topic: null,
      topics: [],
    } as MainStore;
  },
  getters: {
    getTopic(): string | null {
      return this.topic;
    },
    getTopics(): Array<Topic> {
      return this.topics;
    },
  },
  actions: {
    setTopic(selection: string | null) {
      this.topic = selection;
    },
    addTopic(topic: Topic) {
      this.topics.push(topic);
    },
  },
  persist: true,
});
