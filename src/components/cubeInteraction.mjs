// Camera interaction only. Geometry and projection belong to neo-cube-web.
export const INITIAL_CUBE_VIEW = Object.freeze({ yaw: Math.PI / 4, pitch: Math.PI / 7, zoom: 1 });
export const MIN_CUBE_ZOOM = 0.65;
export const MAX_CUBE_ZOOM = 1.35;
const MAX_PITCH = Math.PI / 2 - 0.04;
const DRAG_SENSITIVITY = 0.009;
const KEY_ROTATION = 0.13;
const ZOOM_STEP = 1.12;

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const wrapAngle = value => ((value + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;

export function rotateCube(view, deltaX, deltaY) {
  if (!Number.isFinite(deltaX) || !Number.isFinite(deltaY)) return view;
  return {
    ...view,
    yaw: wrapAngle(view.yaw + deltaX * DRAG_SENSITIVITY),
    pitch: clamp(view.pitch + deltaY * DRAG_SENSITIVITY, -MAX_PITCH, MAX_PITCH),
  };
}

export function zoomCube(view, factor) {
  if (!Number.isFinite(factor) || factor <= 0) return view;
  return { ...view, zoom: clamp(view.zoom * factor, MIN_CUBE_ZOOM, MAX_CUBE_ZOOM) };
}

export function resetCubeView() { return { ...INITIAL_CUBE_VIEW }; }

export function applyCubeKey(view, key) {
  switch (key) {
    case 'ArrowLeft': return rotateCube(view, -KEY_ROTATION / DRAG_SENSITIVITY, 0);
    case 'ArrowRight': return rotateCube(view, KEY_ROTATION / DRAG_SENSITIVITY, 0);
    case 'ArrowUp': return rotateCube(view, 0, -KEY_ROTATION / DRAG_SENSITIVITY);
    case 'ArrowDown': return rotateCube(view, 0, KEY_ROTATION / DRAG_SENSITIVITY);
    case '+':
    case '=': return zoomCube(view, ZOOM_STEP);
    case '-': return zoomCube(view, 1 / ZOOM_STEP);
    case '0':
    case 'Home': return resetCubeView();
    default: return null;
  }
}

export function applyPointerChange(view, before, after) {
  const valid = points => points.every(point => Number.isFinite(point.x) && Number.isFinite(point.y));
  if (before.length !== after.length || !valid(before) || !valid(after)) return view;
  if (before.length === 1) return rotateCube(view, after[0].x - before[0].x, after[0].y - before[0].y);
  if (before.length >= 2) {
    const distance = points => Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
    const previousDistance = distance(before);
    return previousDistance > 0 ? zoomCube(view, distance(after) / previousDistance) : view;
  }
  return view;
}
