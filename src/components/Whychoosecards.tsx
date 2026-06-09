interface Card {
  icon_tag: string;
  title: string;
  description: string;
}

interface WhyChooseCardsProps {
  cards: Card[];
}

export default function WhyChooseCards({ cards }: WhyChooseCardsProps) {
  return (
    <section className="pb-[60px] md:pb-[72px] lg:pb-[90px]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white px-8 py-10 rounded-[3px] border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(2,107,174,0.1)] hover:border-[#026BAE]/30 transition-all duration-300 group"
            >
              {/* SVG Icon */}
              <div className="w-14 h-14 bg-[#EC2226]/5 rounded-full flex items-center justify-center mb-6">
                <span
                  dangerouslySetInnerHTML={{ __html: card.icon_tag }}
                  className="[&>svg]:w-8 [&>svg]:h-8"
                />
              </div>
              <h3 className="font-semibold text-[20px] md:text-[24px] text-[#026BAE] mb-4">
                {card.title}
              </h3>
              <p className="text-gray-600 text-[16px] md:text-[18px] leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}