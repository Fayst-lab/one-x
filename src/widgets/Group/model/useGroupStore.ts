import { create } from 'zustand';

type ContentType = 'albums' | 'singles';

interface GroupContentSwitcherState {
    selected: ContentType;
    setSelected: (value: ContentType) => void;
}

export const useGroupContentSwitcherStore = create<GroupContentSwitcherState>((set) => ({
    selected: 'singles',
    setSelected: (value) => set({ selected: value }),
}));
