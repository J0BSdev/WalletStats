import { WhyYouLoseData } from '@/types';

interface WhyYouLoseConclusionProps {
  data: WhyYouLoseData;
}

export default function WhyYouLoseConclusion({ data }: WhyYouLoseConclusionProps) {
  return (
    <div className="w-full mt-8 pt-8 border-t border-border">
      <div className="text-xs uppercase tracking-wider text-text-secondary mb-3">CONCLUSION</div>
      <h2 className="text-xl font-semibold mb-4 text-text-primary">Why you lose money</h2>
      <p className="text-text-secondary mb-4 leading-relaxed">
        {data.dominantCause}.
      </p>
      <div className="text-xs text-text-secondary pt-3 border-t border-border">
        Evidence: {data.evidenceText}
      </div>
    </div>
  );
}

