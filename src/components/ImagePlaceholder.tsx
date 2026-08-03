interface Props {
  label?: string
  style?: React.CSSProperties
  fit?: 'cover' | 'contain'
}

export default function ImagePlaceholder({ label, style, fit = 'cover' }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#141414',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        objectFit: fit,
        ...style,
      }}
    >
      {label && (
        <span
          style={{
            fontSize: 13,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#333333',
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
