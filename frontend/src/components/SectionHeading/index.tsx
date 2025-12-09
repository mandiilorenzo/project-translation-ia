import SectionHeadingProps from "@/types/sectionHeading";

const SectionHeading = ({ 
  badge, 
  title, 
  subtitle, 
  align = 'center' 
}: SectionHeadingProps) => (
  <div className={`max-w-3xl mx-auto mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    {badge && (
      <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-teal-700 uppercase bg-teal-50 rounded-full border border-teal-100">
        {badge}
      </span>
    )}
    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
      {title}
    </h2>
    {subtitle && (
      <p className="text-lg text-slate-600 leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeading;