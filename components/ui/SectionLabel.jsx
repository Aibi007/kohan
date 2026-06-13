export default function SectionLabel({ children, light = false, center = false }) {
  return (
    <span
      className={`section-label ${light ? 'opacity-70' : ''} ${center ? 'text-center' : ''}`}
      style={{ marginBottom: '0.75rem' }}
    >
      {children}
    </span>
  );
}
