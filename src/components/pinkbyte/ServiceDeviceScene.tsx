import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { SERVICES, type ServiceDevice } from "./service-data";

function roundedShape(width: number, height: number, radius: number) {
  const s = new THREE.Shape();
  const x = -width / 2, y = -height / 2;
  s.moveTo(x + radius, y);
  s.lineTo(x + width - radius, y);
  s.quadraticCurveTo(x + width, y, x + width, y + radius);
  s.lineTo(x + width, y + height - radius);
  s.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  s.lineTo(x + radius, y + height);
  s.quadraticCurveTo(x, y + height, x, y + height - radius);
  s.lineTo(x, y + radius);
  s.quadraticCurveTo(x, y, x + radius, y);
  return s;
}

function tokenColor(name: string) {
  const probe = document.createElement("span");
  probe.style.color = `var(${name})`;
  document.body.append(probe);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) { probe.remove(); return new THREE.Color(); }
  ctx.fillStyle = getComputedStyle(probe).color;
  ctx.fillRect(0, 0, 1, 1);
  const [r = 0, g = 0, b = 0] = ctx.getImageData(0, 0, 1, 1).data;
  probe.remove();
  return new THREE.Color(r / 255, g / 255, b / 255).convertSRGBToLinear();
}

function device(kind: ServiceDevice, image: string, colors: { metal: THREE.Color; bezel: THREE.Color }) {
  const group = new THREE.Group();
  const phone = kind === "phone";
  const width = phone ? 2.05 : 5.35;
  const height = phone ? 4.25 : kind === "tablet" ? 3.9 : 3.48;
  const metal = new THREE.MeshStandardMaterial({ color: colors.metal, metalness: 0.72, roughness: 0.3 });
  const black = new THREE.MeshStandardMaterial({ color: colors.bezel, metalness: 0.2, roughness: 0.4 });
  const panel = (w: number, h: number, depth: number, radius: number, material: THREE.Material) => {
    const geometry = new THREE.ExtrudeGeometry(roundedShape(w, h, radius), {
      depth, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.025, bevelThickness: 0.025, curveSegments: 10,
    });
    return new THREE.Mesh(geometry, material);
  };
  const shell = panel(width, height, 0.15, phone ? 0.27 : 0.2, metal);
  group.add(shell);
  const bezel = panel(width - 0.07, height - 0.07, 0.015, phone ? 0.25 : 0.18, black);
  bezel.position.z = 0.17;
  group.add(bezel);
  const texture = new THREE.TextureLoader().load(image);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  const screenMaterial = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
  const screen = new THREE.Mesh(new THREE.ShapeGeometry(roundedShape(width - 0.32, height - 0.3, phone ? 0.2 : 0.07)), screenMaterial);
  // ShapeGeometry UVs are local coordinates; map the full screenshot exactly once.
  const positions = screen.geometry.getAttribute("position");
  const uv = screen.geometry.getAttribute("uv");
  for (let i = 0; i < positions.count; i++) uv.setXY(i, (positions.getX(i) + (width - 0.32) / 2) / (width - 0.32), (positions.getY(i) + (height - 0.3) / 2) / (height - 0.3));
  screen.position.z = 0.215;
  group.add(screen);
  if (phone) {
    const island = panel(0.6, 0.14, 0.012, 0.07, black);
    island.position.set(0, height / 2 - 0.23, 0.23); group.add(island);
    const key = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.36, 0.08), metal);
    key.position.set(width / 2 + 0.04, 0.5, 0.08); group.add(key);
  }
  if (kind === "laptop") {
    const base = panel(width + 0.35, 1.7, 0.1, 0.1, metal);
    base.rotation.x = -Math.PI / 2;
    base.position.set(0, -height / 2 - 0.08, 0.85); group.add(base);
    const keyboard = panel(width - 0.6, 0.85, 0.006, 0.06, black);
    keyboard.rotation.x = -Math.PI / 2; keyboard.position.set(0, -height / 2 + 0.04, 0.55); group.add(keyboard);
    const trackpad = panel(1.1, 0.4, 0.006, 0.035, metal);
    trackpad.rotation.x = -Math.PI / 2; trackpad.position.set(0, -height / 2 + 0.04, 1.22); group.add(trackpad);
  }
  if (kind === "desktop") {
    const stem = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.65, 0.22), metal);
    stem.position.set(0, -height / 2 - 0.3, -0.01); group.add(stem);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.08, 0.9), metal);
    foot.position.set(0, -height / 2 - 0.66, 0.22); group.add(foot);
    group.position.y = 0.28;
  }
  group.rotation.set(-0.08, -0.28, -0.055);
  return group;
}

export default function ServiceDeviceScene({ active }: { active: number }) {
  const host = useRef<HTMLDivElement>(null);
  const select = useRef<((index: number) => void) | null>(null);
  const latest = useRef(active);
  const [unavailable, setUnavailable] = useState(false);
  latest.current = active;
  useEffect(() => { select.current?.(active); }, [active]);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" }); }
    catch { setUnavailable(true); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0, 0);
    element.append(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-4, 4, 3, -3, 0.1, 100);
    camera.position.set(0, 0.15, 12);
    scene.add(new THREE.AmbientLight(tokenColor("--service-light"), 2.2));
    const key = new THREE.DirectionalLight(tokenColor("--service-light"), 4);
    key.position.set(-3, 6, 8); scene.add(key);
    const rim = new THREE.DirectionalLight(tokenColor("--service-light"), 2);
    rim.position.set(5, 2, -2); scene.add(rim);
    const colors = { metal: tokenColor("--service-metal"), bezel: tokenColor("--ink") };
    const devices = SERVICES.map((s) => device(s.device, s.image, colors));
    devices.forEach((d, i) => { d.visible = i === latest.current; scene.add(d); });
    let frame = 0, disposed = false, visible = true;
    let current = latest.current;
    let transition: { start: number; from: number; to: number; direction: number } | null = null;
    let pending: number | null = null;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const render = () => { if (!disposed && visible) renderer.render(scene, camera); };
    const settle = (index: number) => {
      devices.forEach((d, i) => { d.visible = i === index; d.position.set(0, SERVICES[i]?.device === "desktop" ? 0.28 : 0, 0); d.rotation.set(-0.08, -0.28, -0.055); });
      current = index;
    };
    const tick = (now: number) => {
      frame = 0;
      if (!transition || disposed) { render(); return; }
      const t = Math.min((now - transition.start) / 880, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      const outgoing = devices[transition.from], incoming = devices[transition.to];
      if (outgoing && incoming) {
        outgoing.position.x = -transition.direction * 7.5 * ease;
        outgoing.position.z = -2 * ease;
        outgoing.rotation.y = -0.28 - transition.direction * 0.65 * ease;
        incoming.position.x = transition.direction * 7.5 * (1 - ease);
        incoming.position.z = -3 * (1 - ease);
        incoming.rotation.y = -0.28 + transition.direction * 0.7 * (1 - ease);
        incoming.rotation.z = -0.055 + 0.06 * (1 - ease);
      }
      render();
      if (t < 1) frame = requestAnimationFrame(tick);
      else {
        settle(transition.to); transition = null; render();
        const next = pending; pending = null;
        if (next !== null && next !== current) change(next);
      }
    };
    const change = (index: number) => {
      if (transition) { pending = index; return; }
      if (index === current) return;
      if (reduced.matches || !visible) { settle(index); render(); return; }
      const incoming = devices[index];
      if (!incoming) return;
      incoming.visible = true;
      transition = { start: performance.now(), from: current, to: index, direction: index > current ? 1 : -1 };
      if (!frame) frame = requestAnimationFrame(tick);
    };
    select.current = change;
    const resize = new ResizeObserver(() => {
      const w = element.clientWidth, h = element.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      const aspect = w / h;
      devices.forEach((d, i) => d.scale.setScalar(w > 500 ? 1.1 : SERVICES[i]?.device === "phone" ? 1.08 : 0.96));
      const halfHeight = Math.max(2.8, 3.45 / aspect);
      camera.left = -halfHeight * aspect; camera.right = halfHeight * aspect;
      camera.top = halfHeight; camera.bottom = -halfHeight; camera.updateProjectionMatrix(); render();
    });
    resize.observe(element);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      if (!visible) { if (frame) cancelAnimationFrame(frame); frame = 0; transition = null; pending = null; settle(latest.current); }
      else render();
    });
    observer.observe(element);
    // Textures decode asynchronously; repaint only while loading, never an idle loop.
    let paints = 0;
    const loadTimer = window.setInterval(() => { render(); if (++paints === 20) window.clearInterval(loadTimer); }, 200);
    render();
    return () => {
      disposed = true; select.current = null; cancelAnimationFrame(frame); window.clearInterval(loadTimer);
      resize.disconnect(); observer.disconnect();
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => {
          if ("map" in material && material.map instanceof THREE.Texture) material.map.dispose();
          material.dispose();
        });
      });
      renderer.dispose(); renderer.domElement.remove();
    };
  }, []);
  return <div ref={host} className="pb-service-canvas" aria-hidden="true">{unavailable && <img src={SERVICES[active]?.image} alt="" className="h-full w-full object-contain" />}</div>;
}