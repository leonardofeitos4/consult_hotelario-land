/* Gradiente fluido em WebGL (ideia do shadergradient.co), sem biblioteca.
   Cada <canvas class="shader"> ganha o seu. Cores vêm de SITE.colors. */
(function () {
  const hex = h => { const n = parseInt(h.replace('#', ''), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; };
  const cols = SITE.colors.map(hex);
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const FS = `precision mediump float;
uniform vec2 r; uniform float t; uniform vec2 m; uniform vec3 c0,c1,c2,c3;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p*=2.02;a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/r; vec2 p=uv; p.x*=r.x/r.y; p*=1.4;
  float s=t*.06;
  vec2 q=vec2(fbm(p+s),fbm(p+vec2(5.2,1.3)-s));
  vec2 w=vec2(fbm(p+3.*q+vec2(1.7,9.2)+s*1.3),fbm(p+3.*q+vec2(8.3,2.8)-s));
  float f=fbm(p+3.*w+(m-.5)*.6);
  vec3 col=mix(c0,c1,smoothstep(.15,.65,f));
  col=mix(col,c2,smoothstep(.45,.95,length(q)*f*1.6));
  col=mix(col,c3,smoothstep(.55,1.,w.x*f*1.9)*.85);
  col+=(hash(gl_FragCoord.xy+t)-.5)*.035;
  gl_FragColor=vec4(col,1.);
}`;

  let mx = .5, my = .5;
  addEventListener('pointermove', e => { mx = e.clientX / innerWidth; my = 1 - e.clientY / innerHeight; });

  function init(canvas) {
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return canvas.classList.add('fallback');
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return canvas.classList.add('fallback');
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = n => gl.getUniformLocation(prog, n);
    const uR = U('r'), uT = U('t'), uM = U('m');
    ['c0', 'c1', 'c2', 'c3'].forEach((n, i) => gl.uniform3fv(U(n), cols[i]));

    const scale = .5;                                   // gradiente é suave: render leve
    const resize = () => {
      canvas.width = Math.max(2, canvas.clientWidth * scale);
      canvas.height = Math.max(2, canvas.clientHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uR, canvas.width, canvas.height);
    };
    new ResizeObserver(resize).observe(canvas); resize();

    let on = true; const t0 = performance.now();
    new IntersectionObserver(es => { on = es[0].isIntersecting; if (on) requestAnimationFrame(frame); }).observe(canvas);
    function frame(now) {
      if (!on || document.hidden) return;
      gl.uniform1f(uT, still ? 12 : (now - t0) / 1000);
      gl.uniform2f(uM, mx, my);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!still) requestAnimationFrame(frame);
    }
    document.addEventListener('visibilitychange', () => { if (!document.hidden) requestAnimationFrame(frame); });
    requestAnimationFrame(frame);
  }
  document.querySelectorAll('canvas.shader').forEach(init);
})();
