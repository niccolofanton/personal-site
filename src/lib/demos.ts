export interface Demo {
  name: string
  url: string
  description: string
  tags: string[]
}

/**
 * Every WebGL / three.js demo published on a *.niccolofanton.dev subdomain.
 * Kept in one place so the /demos page, the sitemap and the structured data
 * cannot drift apart.
 */
export const demos: Demo[] = [
  {
    name: 'Depth of Field',
    url: 'https://dof.niccolofanton.dev',
    description:
      'The ultramock.io blurs rebuilt in three.js WebGPU and TSL, with a thin-lens circle-of-confusion model over a procedural blueprint floor.',
    tags: ['WebGPU', 'TSL', 'post-processing'],
  },
  {
    name: 'Infinite Jelly Glass',
    url: 'https://jelly.niccolofanton.dev',
    description:
      'An infinite spherical carousel of glass cards refracted through a GPU-simulated XPBD cloth, written from scratch in WebGPU and TSL.',
    tags: ['WebGPU', 'TSL', 'XPBD cloth'],
  },
  {
    name: 'Icosahedron',
    url: 'https://icosa.niccolofanton.dev',
    description:
      'A wireframe icosahedron with a cube on every vertex, rendered through a hand-written temporal anti-aliasing and Kawase bloom pipeline.',
    tags: ['three.js', 'TAA', 'bloom'],
  },
  {
    name: 'Glass Filters',
    url: 'https://glass.niccolofanton.dev',
    description:
      'Screen-space glass filters as a WebGPU post pass: reeded, hammered, ripple, prism and a fly’s-eye microlens array, all in three.js TSL.',
    tags: ['WebGPU', 'TSL', 'refraction'],
  },
  {
    name: 'Ink Reveal',
    url: 'https://ink.niccolofanton.dev',
    description:
      'A reverse engineering of the davidwhyte.com ink reveal: a watercolour-blotch image reveal in WebGL with a depth-aware advancing front.',
    tags: ['WebGL', 'GLSL', 'image reveal'],
  },
  {
    name: 'Shared Experience',
    url: 'https://metaverse.niccolofanton.dev',
    description:
      'A three-player WebGL space with peer-to-peer proximity voice chat over WebRTC — no game server, the browsers talk directly to each other.',
    tags: ['three.js', 'WebRTC', 'multiplayer'],
  },
  {
    name: 'Porsche Configurator',
    url: 'https://car.niccolofanton.dev',
    description:
      'A scroll-driven 3D Porsche showcase and colour configurator built with Angular, three.js and Theatre.js for the camera choreography.',
    tags: ['Angular', 'three.js', 'Theatre.js'],
  },
  {
    name: 'DUNA',
    url: 'https://duna.niccolofanton.dev',
    description:
      'A WebXR engine for shared 3D worlds in the browser: avatars, real-time multiplayer, voice chat, portals and web3/ENS login.',
    tags: ['WebXR', 'multiplayer', 'three.js'],
  },
  {
    name: 'Smooth Orbit Controls',
    url: 'https://orbit.niccolofanton.dev',
    description:
      'A drop-in OrbitControls component for React Three Fiber and drei that adds smooth, damped inertial zoom instead of stepped wheel jumps.',
    tags: ['React Three Fiber', 'drei', 'library'],
  },
  {
    name: 'Draggable Rigid Body',
    url: 'https://drag.niccolofanton.dev',
    description:
      'A customizable React Three Fiber component for physics-based drag-and-drop, built on react-three-rapier and @use-gesture/react.',
    tags: ['React Three Fiber', 'rapier', 'physics'],
  },
  {
    name: 'Singularity',
    url: 'https://singularity.niccolofanton.dev',
    description:
      'An optimized React Three Fiber and Next.js scene written for a Codrops tutorial on keeping three.js scenes both performant and good-looking.',
    tags: ['React Three Fiber', 'rapier', 'optimization'],
  },
  {
    name: 'Datamosh',
    url: 'https://datamosh.niccolofanton.dev',
    description:
      'Real-time glitch corruption applied to a live 3D scene: interactive WebGL datamoshing with React Three Fiber and GLSL shaders.',
    tags: ['WebGL', 'GLSL', 'glitch'],
  },
  {
    name: 'ASCII Noise Porsche',
    url: 'https://porsche.niccolofanton.dev',
    description:
      'A Porsche re-rendered through a dithered ASCII pass, with twelve presets and a fluid mouse-trail noise displacement.',
    tags: ['three.js', 'ASCII', 'dithering'],
  },
  {
    name: 'Flow Field Particles',
    url: 'https://flowfield.niccolofanton.dev',
    description:
      'GPGPU particles morphing between shapes on a 4D simplex flow field, run through bloom, depth of field and a trail accumulation pass.',
    tags: ['GPGPU', 'three.js', 'particles'],
  },
  {
    name: 'Black Sea',
    url: 'https://sea.niccolofanton.dev',
    description:
      'A 1000×1000 plane displaced by a single image bound simultaneously as displacement, colour and alpha map.',
    tags: ['three.js', 'displacement', 'geometry'],
  },
  {
    name: 'Infinite Carousel',
    url: 'https://carousel.niccolofanton.dev',
    description:
      'An infinite three.js tunnel of image and video cards with wheel and drag scrolling, hover focus and SVG clipping.',
    tags: ['three.js', 'scroll', 'SVG clipping'],
  },
  {
    name: 'Driftpane',
    url: 'https://driftpane.niccolofanton.dev',
    description:
      'A non-invasive layer on Tweakpane v4: localStorage persistence, a draggable and resizable panel, a presets menu and light/dark/auto theming.',
    tags: ['Tweakpane', 'tooling', 'library'],
  },
  {
    name: 'Morphing ASCII',
    url: 'https://m-ascii.niccolofanton.dev',
    description:
      'Real-time ASCII and halftone post-processing for three.js and pmndrs/postprocessing: glyph atlas, Sobel edges, per-cell memory, SDF shape morph.',
    tags: ['post-processing', 'ASCII', 'SDF'],
  },
  {
    name: 'Bone Monogram',
    url: 'https://bone.niccolofanton.dev',
    description:
      'An N monogram built out of 3D bones, auto-rotating on white with transmission-material chromatic aberration.',
    tags: ['React Three Fiber', 'transmission', 'typography'],
  },
  {
    name: 'Three Starter',
    url: 'https://starter.niccolofanton.dev',
    description:
      'A single-file three.js starter: WebGPU renderer, TSL node material, HDRI lighting and a Tweakpane control panel, ready to fork.',
    tags: ['WebGPU', 'TSL', 'starter'],
  },
  {
    name: 'Datamosh Decoder',
    url: 'https://mosh.niccolofanton.dev',
    description:
      'Datamoshing implemented as a real inter-frame decoder loop: motion vectors and residuals deliberately fed the wrong reference frame.',
    tags: ['WebGL', 'codec', 'glitch'],
  },
  {
    name: 'Image Trail',
    url: 'https://trail.niccolofanton.dev',
    description:
      'A real-time WebGL image trail and visual-persistence post-processing effect built with React Three Fiber and three.js.',
    tags: ['post-processing', 'React Three Fiber', 'trails'],
  },
  {
    name: 'Dithering Shader',
    url: 'https://dithering.niccolofanton.dev',
    description:
      'A real-time ordered (Bayer) dithering post-processing effect for 3D scenes, built with React Three Fiber and three.js.',
    tags: ['post-processing', 'dithering', 'Bayer'],
  },
  {
    name: 'Splat Reveals',
    url: 'https://splat.niccolofanton.dev',
    description:
      'Twenty reveal, dissolve and transition effects applied to a gaussian splat figure, built on Spark and three.js.',
    tags: ['gaussian splatting', 'Spark', 'transitions'],
  },
  {
    name: 'Model Grid',
    url: 'https://grid.niccolofanton.dev',
    description:
      'A grid of repeated glTF models receding into depth, driven by Leva camera controls that bypass React re-renders entirely.',
    tags: ['React Three Fiber', 'Leva', 'instancing'],
  },
  {
    name: 'Void Pendulum',
    url: 'https://pendulum.niccolofanton.dev',
    description:
      'A single three.js point drawing a Lissajous trail: autoClear is switched off so every frame accumulates onto the last.',
    tags: ['three.js', 'accumulation', 'Lissajous'],
  },
  {
    name: 'Ember',
    url: 'https://ember.niccolofanton.dev',
    description:
      'The numeral 6 built from 200,000 particles sampled off a glTF surface and coloured from a texture lookup.',
    tags: ['particles', 'glTF sampling', 'three.js'],
  },
  {
    name: 'Gold Panels',
    url: 'https://panels.niccolofanton.dev',
    description:
      'An endless tunnel of black and gold panels lit by god rays, lens flare, depth of field and bloom.',
    tags: ['post-processing', 'god rays', 'bloom'],
  },
  {
    name: 'Glyph',
    url: 'https://glyph.niccolofanton.dev',
    description:
      'The numeral 3 rendered through an ASCII post-processing pass with a palindromic glyph ramp and N8AO ambient occlusion.',
    tags: ['ASCII', 'N8AO', 'post-processing'],
  },
  {
    name: 'Moss Diorama',
    url: 'https://moss.niccolofanton.dev',
    description:
      'A moss diorama captured as a gaussian splat and composited with a glTF mesh in a single React Three Fiber scene under an HDRI.',
    tags: ['gaussian splatting', 'HDRI', 'React Three Fiber'],
  },
  {
    name: 'Particle Column',
    url: 'https://column.niccolofanton.dev',
    description:
      'A column of 100 additive particles falling through bloom, film noise, chromatic aberration and scanlines.',
    tags: ['particles', 'post-processing', 'bloom'],
  },
  {
    name: 'Duna Landing',
    url: 'https://duna-game.niccolofanton.dev',
    description:
      'An interactive 3D WebGL landing page in Angular and three.js: roll a ball across a desert dune and through a glowing portal.',
    tags: ['Angular', 'three.js', 'game'],
  },
]
