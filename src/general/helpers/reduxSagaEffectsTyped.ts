import {put, PutEffect, select, SelectEffect} from 'redux-saga/effects';
import {Action, RootState} from '../store/rootTypes';

export function selectState<T>(selector: (s: RootState) => T): SelectEffect {
  return select(selector);
}

export function putAction(action: Action): PutEffect {
  return put(action);
}
