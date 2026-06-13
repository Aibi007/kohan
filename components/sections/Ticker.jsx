const items = [
  'Cold Stone Grinding — No Heat Damage',
  '100% Pure Ingredients',
  'Freshly Ground on Order',
  'Cash on Delivery — Nationwide',
  'Batch-Numbered Traceability',
  'Video Proof of Purity',
  'Family-Run Since 2019',
];

export default function Ticker() {
  const doubled = [...items, ...items];
  return (
    <div className="bg-green-DEFAULT py-3.5 overflow-hidden">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6 whitespace-nowrap">
            <span className="font-serif text-[0.68rem] tracking-widest2 uppercase text-gold-pale">
              {item}
            </span>
            <span className="text-gold/50 text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
