import test from 'node:test';
import assert from 'node:assert/strict';
import { createCubeEdges, createDecisionGrid, createProjector } from '@neoretroo38/neo-cube-web';
import {
  INITIAL_CUBE_VIEW, MAX_CUBE_ZOOM, MIN_CUBE_ZOOM,
  applyCubeKey, applyPointerChange, resetCubeView, rotateCube, zoomCube,
} from '../src/components/cubeInteraction.mjs';

test('drag changes the camera, preserves zoom and clamps extreme rotations', () => {
  const dragged = applyPointerChange(INITIAL_CUBE_VIEW, [{ x: 10, y: 20 }], [{ x: 50, y: 60 }]);
  assert.notEqual(dragged.yaw, INITIAL_CUBE_VIEW.yaw);
  assert.notEqual(dragged.pitch, INITIAL_CUBE_VIEW.pitch);
  assert.equal(dragged.zoom, 1);
  const extreme = rotateCube(dragged, 100000, -100000);
  assert.ok(extreme.yaw >= -Math.PI && extreme.yaw <= Math.PI);
  assert.ok(extreme.pitch > -Math.PI / 2 && extreme.pitch < Math.PI / 2);
  assert.deepEqual(INITIAL_CUBE_VIEW, resetCubeView());
});

test('two-pointer pinch changes only zoom and invalid distances do not corrupt state', () => {
  const pinch = applyPointerChange(INITIAL_CUBE_VIEW,
    [{ x: 0, y: 0 }, { x: 100, y: 0 }], [{ x: 0, y: 0 }, { x: 120, y: 0 }]);
  assert.equal(pinch.zoom, 1.2);
  assert.equal(pinch.yaw, INITIAL_CUBE_VIEW.yaw);
  assert.equal(pinch.pitch, INITIAL_CUBE_VIEW.pitch);
  assert.equal(applyPointerChange(INITIAL_CUBE_VIEW, [{ x: 0, y: 0 }, { x: 0, y: 0 }], [{ x: 0, y: 0 }, { x: 100, y: 0 }]), INITIAL_CUBE_VIEW);
  assert.equal(applyPointerChange(INITIAL_CUBE_VIEW, [{ x: 0, y: 0 }], [{ x: Number.NaN, y: 0 }]), INITIAL_CUBE_VIEW);
  assert.equal(zoomCube(INITIAL_CUBE_VIEW, Number.POSITIVE_INFINITY), INITIAL_CUBE_VIEW);
});

test('zoom, keyboard and reset share bounds and restore the exact initial orientation', () => {
  assert.equal(zoomCube(INITIAL_CUBE_VIEW, 100).zoom, MAX_CUBE_ZOOM);
  assert.equal(zoomCube(INITIAL_CUBE_VIEW, 0.001).zoom, MIN_CUBE_ZOOM);
  const moved = applyCubeKey(applyCubeKey(INITIAL_CUBE_VIEW, 'ArrowRight'), '+');
  assert.notEqual(moved.yaw, INITIAL_CUBE_VIEW.yaw);
  assert.ok(moved.zoom > 1);
  assert.deepEqual(applyCubeKey(moved, '0'), INITIAL_CUBE_VIEW);
  assert.equal(applyCubeKey(moved, 'Escape'), null);
  assert.ok(applyCubeKey(INITIAL_CUBE_VIEW, 'ArrowUp').pitch < INITIAL_CUBE_VIEW.pitch);
});

test('library geometry remains 12 edges and 27 points within the viewport at maximum zoom', () => {
  const edges = createCubeEdges(2.7);
  const grid = createDecisionGrid(0.85);
  assert.equal(edges.length, 12);
  assert.equal(grid.length, 27);
  for (const yaw of [-Math.PI, -1, 0, 1, Math.PI]) {
    for (const pitch of [-1.53, -0.5, 0, 0.5, 1.53]) {
      const project = createProjector({ yaw, pitch, scale: 42 * MAX_CUBE_ZOOM, center: [135, 135] });
      for (const point of [...edges.flat(), ...grid]) {
        const position = project(point);
        assert.ok(position.every(value => Number.isFinite(value) && value > 0 && value < 270));
      }
    }
  }
});
