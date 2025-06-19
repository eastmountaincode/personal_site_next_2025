import { atom } from 'jotai';

// Atom to store the global crunch override value
// null means use individual card values, number means override all cards
export const crunchOverrideAtom = atom<number | null>(null); 