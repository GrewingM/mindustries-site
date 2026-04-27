"use strict";

// Animated brain constellation: nodes packed inside a lateral brain silhouette,
// k-NN edges, irregular synapse pulses, cursor proximity boost.
// Falls back to a hemisphere "constellation" if the brain mode is disabled.
//
// Brain silhouette path: "Brain" by Lorc — game-icons.net (CC BY 3.0).
// https://game-icons.net/1x1/lorc/brain.html
(function () {
  const wrap = document.getElementById("brain-wrap");
  if (!wrap) return;

  const W = 512, H = 512;
  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hemisphere fallback (used when shape === 'dome')
  const DOME = { cx: 0.5, cy: 0.58, rx: 0.4, ry: 0.44 };

  // Lateral (side-view) brain — Lorc, game-icons.net, CC BY 3.0.
  // Drawn in a 512x512 viewBox.
  const BRAIN_PATH_D =
    "M241.063 54.406c-2.31.008-4.61.032-6.907.094-1.805.05-3.61.106-5.406.188-8.814 1.567-12.884 5.426-15.094 9.843-2.435 4.87-2.34 11.423.375 17.25 2.717 5.83 7.7 10.596 14.657 12.376 6.958 1.78 16.536.86 29.125-7.187l10.063 15.75c-15.818 10.11-31.124 12.777-43.813 9.53-12.688-3.247-22.103-12.123-26.968-22.563-4.584-9.836-5.426-21.376-1.03-31.624-42.917 6.94-81.777 23.398-111.626 46.562-9.81 10.688-10.77 23.11-6.47 31.594 4.83 9.526 16.21 16.48 38.97 9.28l5.656 17.813c-28.58 9.04-52.137-.588-61.28-18.625-2.23-4.397-3.592-9.156-4.127-14.063-4.814 5.712-9.16 11.658-13 17.844l.126.06c-8.614 19.616-8.81 33.203-5.376 42.032 3.436 8.83 10.635 14.44 21.72 17.532 22.168 6.18 58.065-1.277 83.343-20.156 10.82-8.08 21.077-27.677 21.97-42.875.445-7.6-1.165-13.604-4.345-17.438-3.18-3.834-8.272-6.703-18.813-6.594l-.187-18.686c14.487-.15 26.25 4.754 33.375 13.344 7.124 8.59 9.26 19.652 8.625 30.468-1.27 21.633-12.595 44.172-29.438 56.75-29.876 22.314-69.336 31.606-99.53 23.188-13.988-3.9-26.37-12.386-32.75-25.53-9.546 45.446 4.323 87.66 30.718 116.874 3.45 3.82 7.122 7.43 10.97 10.78-2.754-7.887-4.016-16.1-3.72-24.093.53-14.325 6.082-28.346 17.22-38.03 9.134-7.946 21.752-12.53 36.843-12.5 1.006 0 2.034.018 3.062.06 2.35.1 4.763.304 7.22.626l-2.44 18.532c-15.588-2.048-25.705 1.522-32.436 7.375-6.73 5.854-10.443 14.614-10.813 24.625-.74 20.024 12.07 43.406 39.69 50.188l-.032.188c27.192 5.19 57.536.372 88-18.22.018-.012.043-.017.062-.03 6.34-4.45 9.755-8.808 11.438-12.563 1.985-4.432 1.943-8.292.53-12.438-2.824-8.29-12.94-16.812-22.218-19.187-15.002-3.84-24.532 1.436-29 7.72-4.468 6.28-4.74 12.45 2.156 17.81l-11.47 14.75c-14.187-11.033-15.092-30.487-5.905-43.405 6.892-9.688 18.985-16.326 33.564-16.75.607-.018 1.228-.036 1.844-.03 4.306.03 8.79.622 13.437 1.81 15.505 3.97 29.84 15.277 35.28 31.25 1.416 4.155 2.09 8.69 1.876 13.314 16.71-8.538 34.332-16.12 52.282-21.814 30.156-13.78 43.23-37.938 42.72-58.28-.515-20.493-13.187-37.74-42.376-40.626l1.844-18.594c36.666 3.626 58.462 29.848 59.188 58.75.422 16.84-5.754 34.363-18.188 49.28 16.072-1.8 32.044-1.495 47.53 1.627-3.152-6.472-4.68-13.478-4.467-20.438.677-22.036 19.42-42.593 48.875-42.906 1.963-.022 3.974.053 6.03.218l-1.5 18.625c-24.927-1.998-34.3 11.086-34.718 24.656-.412 13.42 8.545 28.442 34.22 30.436 28.3.25 48.588-15.098 58.53-37.906 13.31-30.536 6.997-76.317-34.844-118.188-.792-.793-1.578-1.593-2.375-2.375-.444 3.792-1.424 7.443-2.842 10.844-7.25 17.39-24.233 29.128-41.875 32.407-24.335 4.522-44.29-5.347-53.5-20.406-9.21-15.057-6.792-36.35 9.78-47.56l10.47 15.5c-8.913 6.028-9.28 14.19-4.313 22.31 4.967 8.122 16.17 15.156 34.156 11.814 11.306-2.102 23.896-11.33 28.03-21.25 2.07-4.96 2.47-9.862.408-15.47-1.675-4.555-5.187-9.764-11.72-15.25l-.187-.155c-27.316-20.587-56.338-35.393-85.75-45.157.018.032.045.06.063.093 6.684 12.22 7.18 26.082 3.063 38.344-8.233 24.525-34.07 43.848-66.032 42.78-6.948-.23-13.56 3.12-19.186 9.657-5.627 6.537-9.735 16.113-10.688 26.313-1.905 20.4 6.923 42.886 41.344 54L277 258.28c-41.083-13.264-56.83-45.546-54.22-73.5 1.307-13.975 6.706-26.962 15.157-36.78 8.452-9.818 20.475-16.603 33.97-16.156 24.04.802 42.323-14.084 47.687-30.063 2.682-7.988 2.335-15.937-1.75-23.405-3.968-7.252-11.83-14.423-25.906-19.656-17.114-2.967-34.16-4.367-50.875-4.314zM342.28 306.344c-41.915 3.41-87.366 23.4-125.28 46.562-55.98 34.198-114.89 26.733-156.688-4.28 16.444 58.844 74.712 70.788 135.5 55.905 6.083-2.285 12.06-6.538 17.157-12.03 7.057-7.607 12.17-17.47 13.78-25.625l18.344 3.625c-2.445 12.383-9.078 24.666-18.406 34.72-8.95 9.645-20.61 17.35-34.094 19.374-6.766 15.07-12.334 29.68-14.594 39.906-3.55 16.06 14.206 22.225 22.156 6.03 19.022-38.743 45.87-73.23 79.406-102.967 26.064-17.153 48.406-38.303 62.72-61.22z";

  // Hidden hit-test path: used to check whether (x, y) lies inside the brain.
  const NS = "http://www.w3.org/2000/svg";
  const testSvg = document.createElementNS(NS, "svg");
  testSvg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  testSvg.setAttribute("aria-hidden", "true");
  testSvg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;";
  const testPath = document.createElementNS(NS, "path");
  testPath.setAttribute("d", BRAIN_PATH_D);
  testSvg.appendChild(testPath);
  document.body.appendChild(testSvg);

  // Cache the brain bounding box for tighter random sampling.
  const bbox = testPath.getBBox();
  const BBX = bbox.x / W;
  const BBY = bbox.y / H;
  const BBW = bbox.width / W;
  const BBH = bbox.height / H;

  function inBrain(x, y) {
    return testPath.isPointInFill(new DOMPoint(x * W, y * H));
  }

  function inDome(x, y) {
    const dx = (x - DOME.cx) / DOME.rx;
    const dy = (y - DOME.cy) / DOME.ry;
    return dx * dx + dy * dy < 1;
  }

  function mulberry32(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const densityConfig = {
    sparse: { count: 34, k: 3, driftAmp: 0.0035, brainCount: 70, brainK: 4 },
    medium: { count: 58, k: 4, driftAmp: 0.003, brainCount: 110, brainK: 4 },
    dense:  { count: 88, k: 4, driftAmp: 0.0025, brainCount: 160, brainK: 5 }
  };

  let state = {
    nodes: [],
    edges: [],
    density: "medium",
    shape: "brain",
    k: 4,
    svg: null,
    edgesG: null,
    nodesG: null,
    pulsesG: null,
    halo: null
  };

  function buildConstellation(density, shape) {
    const cfg = densityConfig[density] || densityConfig.medium;
    const sh = shape || state.shape || "brain";
    const rng = mulberry32(1337);
    const nodes = [];
    let attempts = 0;
    const targetCount = sh === "brain" ? cfg.brainCount : cfg.count;
    const kVal = sh === "brain" ? cfg.brainK : cfg.k;
    const packScale = sh === "brain" ? 0.62 : 0.85;
    const minDist = packScale / Math.sqrt(targetCount);

    while (nodes.length < targetCount && attempts < targetCount * 120) {
      attempts++;
      let x, y;
      if (sh === "brain") {
        // Sample inside the brain bbox, then test against the path fill.
        x = BBX + rng() * BBW;
        y = BBY + rng() * BBH;
        if (!inBrain(x, y)) continue;
      } else {
        x = rng();
        const yr = rng();
        y = 0.10 + Math.pow(yr, 1.35) * 0.82;
        if (!inDome(x, y)) continue;
      }
      let ok = true;
      for (const n of nodes) {
        if (Math.hypot(n.x - x, n.y - y) < minDist) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;
      nodes.push({
        x, y,
        bx: x, by: y,
        phx: rng() * Math.PI * 2,
        phy: rng() * Math.PI * 2,
        spx: 0.0003 + rng() * 0.0004,
        spy: 0.00025 + rng() * 0.0004,
        amp: cfg.driftAmp * (0.6 + rng() * 0.8),
        id: nodes.length
      });
    }

    state = {
      nodes, edges: [],
      density, shape: sh, k: kVal,
      svg: null, edgesG: null, nodesG: null, pulsesG: null, halo: null
    };
    render();
    if (!prefersReduced) {
      schedulePulses();
      animate();
    }
  }

  function render() {
    const ns = NS;
    wrap.innerHTML = "";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("aria-label", "An abstract brain made of synapses — visual mark for Mindustries");
    svg.setAttribute("role", "img");

    if (state.shape === "brain") {
      const silhouette = document.createElementNS(ns, "path");
      silhouette.setAttribute("d", BRAIN_PATH_D);
      silhouette.setAttribute("fill", "currentColor");
      silhouette.setAttribute("fill-opacity", "0.04");
      silhouette.setAttribute("stroke", "currentColor");
      silhouette.setAttribute("stroke-opacity", "0.22");
      silhouette.setAttribute("stroke-width", "1.1");
      silhouette.setAttribute("stroke-linejoin", "round");
      svg.appendChild(silhouette);
    }

    const edgesG = document.createElementNS(ns, "g");
    edgesG.setAttribute("stroke", "currentColor");
    edgesG.setAttribute("stroke-width", "0.7");
    svg.appendChild(edgesG);
    state.edgesG = edgesG;

    const pulsesG = document.createElementNS(ns, "g");
    svg.appendChild(pulsesG);
    state.pulsesG = pulsesG;

    const nodesG = document.createElementNS(ns, "g");
    for (const n of state.nodes) {
      const c = document.createElementNS(ns, "circle");
      c.setAttribute("r", 1.8);
      c.setAttribute("fill", "currentColor");
      c.setAttribute("fill-opacity", "0.65");
      nodesG.appendChild(c);
      n.el = c;
    }
    svg.appendChild(nodesG);
    state.nodesG = nodesG;

    const halo = document.createElementNS(ns, "circle");
    halo.setAttribute("r", 0);
    halo.setAttribute("fill", "none");
    halo.setAttribute("stroke", "var(--accent)");
    halo.setAttribute("stroke-opacity", "0.15");
    svg.appendChild(halo);
    state.halo = halo;

    wrap.appendChild(svg);
    state.svg = svg;

    updatePositions(0);
    rebuildEdges();
  }

  function updatePositions(t) {
    for (const n of state.nodes) {
      n.x = n.bx + Math.sin(n.phx + t * n.spx) * n.amp;
      n.y = n.by + Math.cos(n.phy + t * n.spy) * n.amp;
      if (n.el) {
        n.el.setAttribute("cx", n.x * W);
        n.el.setAttribute("cy", n.y * H);
      }
    }
  }

  function rebuildEdges() {
    const { nodes, edgesG, k } = state;
    const seen = new Set();
    const edges = [];
    for (const a of nodes) {
      const cands = nodes
        .filter(b => b !== a)
        .map(b => ({ b, d: Math.hypot(a.x - b.x, a.y - b.y) }))
        .sort((p, q) => p.d - q.d)
        .slice(0, k);
      for (const { b, d } of cands) {
        if (d > 0.22) continue;
        const key = a.id < b.id ? a.id + "-" + b.id : b.id + "-" + a.id;
        if (seen.has(key)) continue;
        seen.add(key);
        edges.push({ a, b, d });
      }
    }
    state.edges = edges;

    const ns = NS;
    const existing = edgesG.children;
    while (existing.length < edges.length) {
      const ln = document.createElementNS(ns, "line");
      ln.setAttribute("stroke-opacity", "0.22");
      edgesG.appendChild(ln);
    }
    for (let i = edges.length; i < existing.length; i++) {
      existing[i].setAttribute("stroke-opacity", "0");
    }
    edges.forEach((e, i) => {
      const ln = existing[i];
      ln.setAttribute("x1", e.a.x * W);
      ln.setAttribute("y1", e.a.y * H);
      ln.setAttribute("x2", e.b.x * W);
      ln.setAttribute("y2", e.b.y * H);
      const op = Math.max(0.08, 0.3 - e.d * 0.9);
      ln.setAttribute("stroke-opacity", ln._firing ? "0.85" : String(op));
      ln.setAttribute("stroke", ln._firing ? "var(--accent)" : "currentColor");
      e.el = ln;
    });
  }

  function firePulse(edge) {
    const ns = NS;
    const pulse = document.createElementNS(ns, "circle");
    pulse.setAttribute("r", 2.6);
    pulse.setAttribute("fill", "var(--accent)");
    pulse.setAttribute("filter", "drop-shadow(0 0 4px var(--accent))");
    state.pulsesG.appendChild(pulse);
    const dur = 460 + Math.random() * 380;
    const start = performance.now();
    if (edge.el) edge.el._firing = true;

    function tick(now) {
      const t = Math.min(1, (now - start) / dur);
      const e = t * t * (3 - 2 * t);
      const x = (edge.a.x + (edge.b.x - edge.a.x) * e) * W;
      const y = (edge.a.y + (edge.b.y - edge.a.y) * e) * H;
      pulse.setAttribute("cx", x);
      pulse.setAttribute("cy", y);
      pulse.setAttribute("opacity", Math.sin(t * Math.PI));
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        pulse.remove();
        if (edge.el) edge.el._firing = false;
        [edge.a, edge.b].forEach(n => {
          if (!n.el) return;
          n.el.setAttribute("fill", "var(--accent)");
          n.el.setAttribute("fill-opacity", "1");
          n.el.setAttribute("r", 2.6);
          setTimeout(() => {
            if (!n.el) return;
            n.el.setAttribute("fill", "currentColor");
            n.el.setAttribute("fill-opacity", "0.65");
            n.el.setAttribute("r", 1.8);
          }, 360);
        });
      }
    }
    requestAnimationFrame(tick);
  }

  let cursorBoost = 0, cursorX = -1, cursorY = -1;

  function schedulePulses() {
    if (prefersReduced) return;
    const delay = 700 + Math.random() * 600 - cursorBoost * 400;
    setTimeout(() => {
      if (!document.hidden && state.edges && state.edges.length) {
        const count =
          1 + (Math.random() < 0.35 ? 1 : 0) + (cursorBoost > 0.4 ? 1 : 0);
        for (let i = 0; i < count; i++) {
          let edge;
          if (cursorX >= 0 && Math.random() < 0.6) {
            const cands = state.edges
              .map(e => {
                const mx = ((e.a.x + e.b.x) / 2) * W;
                const my = ((e.a.y + e.b.y) / 2) * H;
                return { e, d: Math.hypot(mx - cursorX, my - cursorY) };
              })
              .sort((p, q) => p.d - q.d)
              .slice(0, 8);
            edge = cands[Math.floor(Math.random() * cands.length)].e;
          } else {
            edge = state.edges[Math.floor(Math.random() * state.edges.length)];
          }
          if (edge) firePulse(edge);
        }
      }
      schedulePulses();
    }, Math.max(200, delay));
  }

  let lastEdgeRebuild = 0;
  function animate() {
    if (prefersReduced) return;
    const loop = (now) => {
      updatePositions(now);
      if (now - lastEdgeRebuild > 240) {
        rebuildEdges();
        lastEdgeRebuild = now;
      } else if (state.edges) {
        for (const e of state.edges) {
          if (!e.el) continue;
          e.el.setAttribute("x1", e.a.x * W);
          e.el.setAttribute("y1", e.a.y * H);
          e.el.setAttribute("x2", e.b.x * W);
          e.el.setAttribute("y2", e.b.y * H);
        }
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  wrap.addEventListener("pointermove", (ev) => {
    if (!state.svg) return;
    const rect = state.svg.getBoundingClientRect();
    const x = (ev.clientX - rect.left) * (W / rect.width);
    const y = (ev.clientY - rect.top) * (H / rect.height);
    cursorX = x;
    cursorY = y;
    cursorBoost = 1;
    if (state.halo) {
      state.halo.setAttribute("cx", x);
      state.halo.setAttribute("cy", y);
      state.halo.setAttribute("r", 70);
      state.halo.setAttribute("opacity", "1");
    }
    for (const n of state.nodes) {
      const d = Math.hypot(n.x * W - x, n.y * H - y);
      if (d < 70) {
        const k = 1 - d / 70;
        n.el.setAttribute("fill-opacity", 0.65 + k * 0.35);
        n.el.setAttribute("r", 1.8 + k * 1.2);
      }
    }
  });

  wrap.addEventListener("pointerleave", () => {
    cursorX = -1;
    cursorY = -1;
    cursorBoost = 0;
    if (state.halo) {
      state.halo.setAttribute("r", 0);
      state.halo.setAttribute("opacity", "0");
    }
    for (const n of state.nodes) {
      n.el.setAttribute("fill-opacity", "0.65");
      n.el.setAttribute("r", "1.8");
    }
  });

  setInterval(() => { cursorBoost *= 0.9; }, 400);

  buildConstellation("medium", "brain");
})();
