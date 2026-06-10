interface GridItem {
  grid_icon_svg: string;
  grid_title: string;
  grid_subtitle: string;
}

interface HighlightsBarProps {
  items: GridItem[];
}

export default function HighlightsBar({ items }: HighlightsBarProps) {
  if (!items || !Array.isArray(items)) return null;

  return (
    <section className="mb-12 md:mb-[110px] max-w-[1320px] mx-auto px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-0 lg:gap-0 lg:divide-x lg:border border-[#026BAE66] divide-[#026BAE66] bg-white">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-6 px-4 md:p-2 md:justify-center w-full h-[68px] border border-[#026BAE66] lg:border-0"
          >
            {/* SVG Icon */}
            <span
              className="flex-shrink-0"
              dangerouslySetInnerHTML={{ __html: item.grid_icon_svg }}
            />
            <div className="flex flex-row md:flex-col">
              <h3
                className="font-semibold text-[14px] md:text-[16px] lg:text-[18px] text-[#272727]"
                dangerouslySetInnerHTML={{
                  __html: item.grid_title + "&nbsp;",
                }}
              />
              <p
                className="text-[14px] md:text-[16px] lg:text-[18px]"
                dangerouslySetInnerHTML={{ __html: item.grid_subtitle }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}