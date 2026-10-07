import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../hooks/useInView.js'

// Signature visual: a quiet network of nodes with small "packets" of data
// travelling along the links. The pointer lights up nearby connections.
const COLORS = ['143,116,255', '95,139,255', '216,180,255']
const LINK_DIST = 150

export default function NetworkCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const reduce = prefersReducedMotion()

    let w = 0
    let h = 0
    let nodes = []
    let packets = []
    let raf = 0
    let visible = true
    const mouse = { x: -9999, y: -9999 }

    const init = () => {
      const rect = host.getBoundingClientRect()
      w = rect.width
      h = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const cap = w < 700 ? 26 : 58
      const count = Math.max(16, Math.min(cap, Math.round((w * h) / 24000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.4 + 0.7,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
      packets = []
    }

    const frame = () => {
      ctx.clearRect(0, 0, w, h)

      if (!reduce) {
        for (const n of nodes) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < 0 || n.x > w) n.vx *= -1
          if (n.y < 0 || n.y > h) n.vy *= -1
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d > LINK_DIST) continue
          const mx = (a.x + b.x) / 2 - mouse.x
          const my = (a.y + b.y) / 2 - mouse.y
          const near = Math.max(0, 1 - Math.hypot(mx, my) / 190)
          const alpha = (1 - d / LINK_DIST) * (0.16 + near * 0.5)
          ctx.strokeStyle = `rgba(${a.c},${alpha})`
          ctx.lineWidth = 0.6 + near * 0.6
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      if (!reduce && packets.length < 7 && Math.random() < 0.03) {
        const a = nodes[Math.floor(Math.random() * nodes.length)]
        const near = nodes.filter((n) => n !== a && Math.hypot(n.x - a.x, n.y - a.y) < LINK_DIST)
        if (near.length) {
          packets.push({
            a,
            b: near[Math.floor(Math.random() * near.length)],
            t: 0,
            speed: 0.012 + Math.random() * 0.012,
          })
        }
      }
      packets = packets.filter((p) => p.t < 1)
      for (const p of packets) {
        p.t += p.speed
        const x = p.a.x + (p.b.x - p.a.x) * p.t
        const y = p.a.y + (p.b.y - p.a.y) * p.t
        const g = ctx.createRadialGradient(x, y, 0, x, y, 9)
        g.addColorStop(0, 'rgba(235,225,255,0.95)')
        g.addColorStop(1, 'rgba(143,116,255,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, 9, 0, Math.PI * 2)
        ctx.fill()
      }

      for (const n of nodes) {
        const near = Math.max(0, 1 - Math.hypot(n.x - mouse.x, n.y - mouse.y) / 160)
        ctx.fillStyle = `rgba(${n.c},${0.45 + near * 0.55})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r + near * 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = () => {
      frame()
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (reduce || raf || !visible || document.hidden) return
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    init()
    frame()
    start()

    const onPointer = (e) => {
      const r = host.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    let resizeTimer = 0
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        init()
        frame()
      }, 120)
    })
    ro.observe(host)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(host)

    host.addEventListener('pointermove', onPointer)
    host.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      clearTimeout(resizeTimer)
      ro.disconnect()
      io.disconnect()
      host.removeEventListener('pointermove', onPointer)
      host.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
}
