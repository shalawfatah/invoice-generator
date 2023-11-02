// JotaiAtoms.js
import { atom } from 'jotai';

export const sessionAtom = atom(null);
export const userAtom = atom(null);
export const isSessionSetAtom = atom(false);
export const profileAtom = atom(null)
export const companiesAtom = atom([])
export const triggerAtom = atom(false)
export const invoiceTriggerAtom = atom(false)
export const estimateTriggerAtom = atom(false)
export const profileTriggerAtom = atom(false)