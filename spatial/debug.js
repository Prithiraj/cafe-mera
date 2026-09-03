export function createSpatialDebug({ enabled, renderer, quality }) {
  if (!enabled) return { update() {}, destroy() {} };

  const panel = document.createElement('aside');
  panel.className = 'spatial-debug';
  panel.setAttribute('aria-hidden', 'true');
  panel.innerHTML = '<strong>Spatial debug</strong><pre></pre>';
  document.body.append(panel);
  const output = panel.querySelector('pre');

  let lastUpdate = 0;
  let frameCount = 0;
  let fps = 0;
  let fpsWindowStart = performance.now();

  function update(now, details = {}) {
    frameCount += 1;
    if (now - fpsWindowStart >= 1000) {
      fps = Math.round((frameCount * 1000) / Math.max(now - fpsWindowStart, 1));
      frameCount = 0;
      fpsWindowStart = now;
    }

    if (now - lastUpdate < 180) return;
    lastUpdate = now;
    const info = renderer.info;
    output.textContent = [
      `tier: ${quality.tier} (${quality.name})`,
      `section: ${details.section || '-'}`,
      `focus: ${details.focus ?? '-'}`,
      `fps: ${fps}`,
      `dpr cap: ${quality.dpr}`,
      `draw calls: ${info.render.calls}`,
      `triangles: ${info.render.triangles}`,
      `textures: ${info.memory.textures}`,
      `geometries: ${info.memory.geometries}`,
      `rendering: ${details.rendering ? 'active' : 'idle'}`,
    ].join('\n');
  }

  function destroy() {
    panel.remove();
  }

  return { update, destroy };
}
