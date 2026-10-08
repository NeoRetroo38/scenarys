export interface CubeViewState { readonly yaw: number; readonly pitch: number; readonly zoom: number }
export interface CubePointer { readonly x: number; readonly y: number }
export const INITIAL_CUBE_VIEW: Readonly<CubeViewState>;
export const MIN_CUBE_ZOOM: number;
export const MAX_CUBE_ZOOM: number;
export function rotateCube(view: CubeViewState, deltaX: number, deltaY: number): CubeViewState;
export function zoomCube(view: CubeViewState, factor: number): CubeViewState;
export function resetCubeView(): CubeViewState;
export function applyCubeKey(view: CubeViewState, key: string): CubeViewState | null;
export function applyPointerChange(view: CubeViewState, before: readonly CubePointer[], after: readonly CubePointer[]): CubeViewState;
