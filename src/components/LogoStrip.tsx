// Logo strip with infinite marquee
// Replace placeholder logos with real SVG/PNG files when available

const logos = [
  { name: 'SMA Solar',    style: { fontFamily: 'DM Sans, sans-serif',         fontWeight: 900, letterSpacing: '-0.03em', fontSize: '15px' } },
  { name: 'TRINA SOLAR',  style: { fontFamily: 'Space Grotesk, sans-serif',   fontWeight: 300, letterSpacing: '0.18em',  fontSize: '11px' } },
  { name: 'BYD',          style: { fontFamily: 'DM Mono, monospace',           fontWeight: 700, letterSpacing: '-0.02em', fontSize: '18px' } },
  { name: 'E.ON',         style: { fontFamily: 'DM Sans, sans-serif',         fontWeight: 900, letterSpacing: '-0.04em', fontSize: '17px' } },
  { name: 'KfW Bank',     style: { fontFamily: 'DM Sans, sans-serif',         fontWeight: 300, letterSpacing: '0.06em',  fontSize: '14px' } },
  { name: 'BAFA',         style: { fontFamily: 'Space Grotesk, sans-serif',   fontWeight: 700, letterSpacing: '0.22em',  fontSize: '12px' } },
  { name: 'Westenergie',  style: { fontFamily: 'DM Sans, sans-serif',         fontWeight: 500, letterSpacing: '-0.01em', fontSize: '14px' } },
  { name: 'LG Energy',    style: { fontFamily: 'DM Mono, monospace',           fontWeight: 700, letterSpacing: '0.04em',  fontSize: '13px' } },
]

// Duplicate for seamless infinite loop
const track = [...logos, ...logos]

export default function LogoStrip() {
  return (
    <div className="relative" style={{ marginTop: '-80px', zIndex: 10 }}>
      {/* Gradient fade from photo into page — revealed on scroll */}
      <div style={{
        height: '80px',
        background: 'linear-gradient(to bottom, transparent 0%, #ffffff 100%)',
        pointerEvents: 'none',
      }} />
    <div
      className="relative z-10 overflow-hidden"
      style={{
        borderTop: '1px solid rgba(0,0,0,0.06)',
        background: 'rgba(0,0,0,0.02)',
        padding: '16px 0 20px',
      }}
    >
      {/* Fade bottom into background */}
      <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none z-20"
        style={{ background: 'linear-gradient(to bottom, transparent, #ffffff)' }} />
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #ffffff, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #ffffff, transparent)' }} />

      <div className="marquee-track flex items-center" style={{ width: 'max-content', gap: 0 }}>
        {track.map((logo, i) => (
          <div
            key={i}
            className="flex items-center"
            style={{ padding: '0 40px', whiteSpace: 'nowrap' }}
          >
            <span style={{ ...logo.style, color: 'rgba(26,26,26,0.35)' }}>
              {logo.name}
            </span>
            {/* Separator dot */}
            <span
              style={{
                display: 'inline-block',
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                background: 'rgba(245,176,64,0.25)',
                marginLeft: '40px',
              }}
            />
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}
