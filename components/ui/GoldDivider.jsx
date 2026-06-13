export default function GoldDivider({ className = '' }) {
  return (
    <div className={`gold-divider my-6 ${className}`}>
      <div className="gold-diamond" />
    </div>
  );
}
