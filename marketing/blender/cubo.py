"""Render del Cubo de Neo con la estética de choisys, para marketing.

Uso en el Mac (sin abrir Blender):
  /Applications/Blender.app/Contents/MacOS/Blender -b --factory-startup -P marketing/blender/cubo.py -- --out marketing/renders
Opciones: --formats web,play,square,story · --samples 64 · --yaw 30 · --pitch 20

Es una ilustración: los Runs son de ejemplo, no datos de usuarios, y nada se calcula. La geometría es la de
CubeView en choisys: cubo exterior a ±2, rejilla de decisiones 3×3×3 a ±1,5, ejes en verde y fases 1 → 3.
"""
import argparse
import math
import os
import sys

import bpy
from mathutils import Vector

# Paleta fijada en choisys (AGENTS.md): fondo negro, aristas blancas, ejes verde neón, Runs anteriores en rojo al 45 %.
WHITE = (1.0, 1.0, 1.0)
GREEN = (0x39 / 255, 0xFF / 255, 0x14 / 255)
RED = (0xFF / 255, 0x2A / 255, 0x2A / 255)

# Formatos: nombre → (ancho, alto, desplazamiento horizontal de la cámara, escala ortográfica del lado mayor).
# Con desplazamiento negativo el cubo queda a la derecha y deja sitio al texto a la izquierda.
FORMATS = {
    'web': (1200, 630, -0.2, 13.0),     # portada y vista previa al compartir (Open Graph)
    'play': (1024, 500, -0.2, 13.6),    # gráfico de funciones de Google Play
    'square': (1080, 1080, 0.0, 8.6),    # publicaciones cuadradas
    'story': (1080, 1920, 0.0, 15.0),     # historias y vídeo vertical
}

# Runs de ejemplo (fila, columna, fase), base 1. El último va en blanco brillante; los anteriores en rojo.
EXAMPLE_RUNS = [
    [(3, 1, 1), (1, 2, 2), (2, 1, 3)],
    [(2, 2, 1), (3, 3, 2), (1, 3, 3)],
    [(1, 1, 1), (2, 3, 2), (3, 2, 3)],
]

GRID_STEP = 1.5
OUTER = 2.0
AXIS_REACH = 2.5


def args():
    argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--out', default='marketing/renders')
    parser.add_argument('--formats', default='web,play,square')
    parser.add_argument('--samples', type=int, default=64)
    parser.add_argument('--yaw', type=float, default=30.0)
    parser.add_argument('--pitch', type=float, default=20.0)
    return parser.parse_args(argv)


def to_blender(x, y, z):
    """Coordenadas de CubeView (x columna, y fila hacia abajo, z fase) → Blender (Z arriba)."""
    return Vector((x, z, -y))


def material(name, color, strength=1.0, alpha=1.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nodes, links = mat.node_tree.nodes, mat.node_tree.links
    nodes.clear()
    out = nodes.new('ShaderNodeOutputMaterial')
    emission = nodes.new('ShaderNodeEmission')
    emission.inputs['Color'].default_value = (*color, 1.0)
    emission.inputs['Strength'].default_value = strength
    if alpha >= 1.0:
        links.new(emission.outputs['Emission'], out.inputs['Surface'])
    else:
        # Velo semitransparente (halo): deja ver lo que tiene dentro.
        mix = nodes.new('ShaderNodeMixShader')
        transparent = nodes.new('ShaderNodeBsdfTransparent')
        mix.inputs['Fac'].default_value = alpha
        links.new(transparent.outputs['BSDF'], mix.inputs[1])
        links.new(emission.outputs['Emission'], mix.inputs[2])
        links.new(mix.outputs['Shader'], out.inputs['Surface'])
    return mat


def tubes(name, segments, radius, mat):
    """Una curva con un tramo por segmento y grosor redondo."""
    curve = bpy.data.curves.new(name, 'CURVE')
    curve.dimensions = '3D'
    curve.bevel_depth = radius
    curve.bevel_resolution = 4
    curve.use_fill_caps = True
    for points in segments:
        spline = curve.splines.new('POLY')
        spline.points.add(len(points) - 1)
        for i, point in enumerate(points):
            spline.points[i].co = (*point, 1.0)
    obj = bpy.data.objects.new(name, curve)
    obj.data.materials.append(mat)
    bpy.context.collection.objects.link(obj)
    return obj


def sphere(name, center, radius, mat):
    mesh = bpy.data.meshes.new(name)
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    import bmesh
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=32, v_segments=16, radius=radius)
    bm.to_mesh(mesh)
    bm.free()
    for poly in mesh.polygons:
        poly.use_smooth = True
    obj.location = center
    obj.data.materials.append(mat)
    return obj


def cone(name, tip, direction, length, radius, mat):
    bpy.ops.mesh.primitive_cone_add(vertices=24, radius1=radius, depth=length)
    obj = bpy.context.active_object
    obj.name = name
    obj.rotation_euler = direction.to_track_quat('Z', 'Y').to_euler()
    obj.location = tip - direction.normalized() * (length / 2)
    obj.data.materials.append(mat)
    return obj


def build_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    world = bpy.data.worlds.new('negro')
    world.use_nodes = True
    world.node_tree.nodes['Background'].inputs['Color'].default_value = (0, 0, 0, 1)
    scene.world = world

    # Sobre fondo negro, la opacidad de CubeView equivale a atenuar el color.
    outer_mat = material('cubo-exterior', WHITE, 0.40)
    grid_mat = material('rejilla', WHITE, 0.55)
    axis_mat = material('ejes', GREEN, 1.0)
    latest_mat = material('ultimo-run', WHITE, 1.0)
    halo_mat = material('halo', WHITE, 1.0, alpha=0.22)
    past_mat = material('runs-anteriores', RED, 0.45)

    h = OUTER
    corners = [(-h, -h, -h), (h, -h, -h), (h, h, -h), (-h, h, -h), (-h, -h, h), (h, -h, h), (h, h, h), (-h, h, h)]
    pairs = [(0, 1), (1, 2), (2, 3), (3, 0), (4, 5), (5, 6), (6, 7), (7, 4), (0, 4), (1, 5), (2, 6), (3, 7)]
    tubes('cubo-exterior', [[to_blender(*corners[a]), to_blender(*corners[b])] for a, b in pairs], 0.014, outer_mat)

    levels = [-GRID_STEP, 0.0, GRID_STEP]
    grid = []
    for a in levels:
        for b in levels:
            grid.append([to_blender(-GRID_STEP, a, b), to_blender(GRID_STEP, a, b)])
            grid.append([to_blender(a, -GRID_STEP, b), to_blender(a, GRID_STEP, b)])
            grid.append([to_blender(a, b, -GRID_STEP), to_blender(a, b, GRID_STEP)])
    tubes('rejilla', grid, 0.009, grid_mat)

    axes = [(1, 0, 0), (0, 1, 0), (0, 0, 1)]
    tubes('ejes', [[to_blender(*[d * -AXIS_REACH * 0.6 for d in axis]), to_blender(*[d * AXIS_REACH for d in axis])] for axis in axes],
          0.018, axis_mat)
    tip = to_blender(0, 0, AXIS_REACH + 0.05)
    cone('flecha-fase', tip, tip - to_blender(0, 0, 0), 0.22, 0.07, axis_mat)
    sphere('centro', to_blender(0, 0, 0), 0.06, axis_mat)
    for phase in (1, 2, 3):
        sphere(f'fase-{phase}', to_blender(0, 0, (phase - 2) * GRID_STEP), 0.05, axis_mat)

    def point(row, column, phase):
        return to_blender((column - 2) * GRID_STEP, (row - 2) * GRID_STEP, (phase - 2) * GRID_STEP)

    for index, run in enumerate(EXAMPLE_RUNS):
        latest = index == len(EXAMPLE_RUNS) - 1
        path = [point(*m) for m in run]
        if latest:
            tubes('ultimo-run-halo', [path], 0.075, halo_mat)
            tubes('ultimo-run', [path], 0.028, latest_mat)
            for i, p in enumerate(path):
                sphere(f'ultimo-{i}-halo', p, 0.19, halo_mat)
                sphere(f'ultimo-{i}', p, 0.1, latest_mat)
        else:
            tubes(f'run-{index}', [path], 0.018, past_mat)
            for i, p in enumerate(path):
                sphere(f'run-{index}-{i}', p, 0.08, past_mat)
    return scene


def camera(scene, yaw, pitch):
    cam_data = bpy.data.cameras.new('camara')
    cam_data.type = 'ORTHO'
    cam = bpy.data.objects.new('camara', cam_data)
    scene.collection.objects.link(cam)
    az, el = math.radians(yaw), math.radians(pitch)
    direction = Vector((math.sin(az) * math.cos(el), -math.cos(az) * math.cos(el), math.sin(el)))
    cam.location = direction * 30
    cam.rotation_euler = (-direction).to_track_quat('-Z', 'Y').to_euler()
    scene.camera = cam
    return cam


def render(options):
    scene = build_scene()
    cam = camera(scene, options.yaw, options.pitch)
    scene.render.engine = 'CYCLES'
    scene.cycles.device = 'CPU'
    scene.cycles.samples = options.samples
    scene.cycles.use_denoising = False
    scene.view_settings.view_transform = 'Standard'  # sin AgX: el verde y el blanco salen exactos
    scene.view_settings.look = 'None'
    scene.render.film_transparent = False
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGB'
    os.makedirs(options.out, exist_ok=True)
    for name in [f.strip() for f in options.formats.split(',') if f.strip()]:
        if name not in FORMATS:
            raise SystemExit(f'Formato desconocido: {name}. Usa: {", ".join(FORMATS)}')
        width, height, shift, scale = FORMATS[name]
        scene.render.resolution_x, scene.render.resolution_y = width, height
        scene.render.resolution_percentage = 100
        cam.data.ortho_scale = scale
        cam.data.shift_x = shift
        scene.render.filepath = os.path.join(os.path.abspath(options.out), f'cubo-{name}-{width}x{height}.png')
        bpy.ops.render.render(write_still=True)
        print('render', scene.render.filepath)


if __name__ == '__main__':
    render(args())
