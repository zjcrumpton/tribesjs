
import type { Merge, ValueOf } from '../utils';
import type * as components from './components';
export type Component = ReturnType<ValueOf<typeof components>>
export type ComponentMap = Partial<Merge<Partial<Component>>>;
