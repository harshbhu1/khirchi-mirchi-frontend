import {
  BlossomTree,
  HangingVines,
  MoonAndClouds,
  Signpost,
  StanzaDivider,
  Sunflower,
  TitleRule,
  WatercolourEdge,
} from "./Doodles";

/**
 * One leaf of the book — the cream notebook page from the reference photo, with
 * its doodles in the margins and the verse hand-set down the middle.
 *
 * Every size below is a percentage of the page, so the whole composition scales
 * as one piece: on a phone the doodles shrink with the paper rather than
 * crowding the verse out of the column.
 */
export default function PoemPage({ page, pageNumber, totalPages }) {
  return (
    <div className="poem-page">
      {/*
        Decorations, confined to the margins the verse column leaves free:
        0–15% on the left, 84–100% on the right. Nothing here may extend into
        the middle, or it collides with the text. Pointer-events off so they
        never eat a click.
      */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-r-lg">
        <WatercolourEdge className="absolute right-0 top-0 h-full w-[10%]" />
        <MoonAndClouds className="absolute right-0 top-[1%] w-[16%]" />
        <HangingVines className="absolute left-0 top-0 w-[14%]" />
        <BlossomTree className="absolute left-0 top-[38%] w-[15%]" />
        <Sunflower className="absolute bottom-[1%] left-0 w-[13%]" />
        <Signpost className="absolute bottom-[2%] right-0 w-[16%]" />
      </div>

      {/* Verse column, inset so it clears the margin art. */}
      <div className="poem-column">
        {page.kind === "title" ? (
          <div className="m-auto text-center">
            <p className="poem-ink poem-sarga-label opacity-70">{page.number}</p>
            <h2 className="poem-ink poem-title-name mt-[3%] font-bold">{page.title}</h2>
            <TitleRule className="mx-auto mt-[4%] w-[88%]" />
            <p className="poem-ink poem-title-sub mt-[4%] opacity-80">{page.subtitle}</p>
          </div>
        ) : (
          <>
            <p className="poem-ink poem-sarga-label text-center opacity-60">
              {page.number}
            </p>

            <div className="flex flex-1 flex-col justify-center gap-[6%]">
              {page.stanzas.map((stanza, index) => (
                <div key={index}>
                  {stanza.map((line, lineIndex) => (
                    <p key={lineIndex} className="poem-ink poem-verse">
                      {line}
                    </p>
                  ))}

                  {index < page.stanzas.length - 1 ? (
                    <StanzaDivider className="mt-[6%] w-[80%] opacity-70" />
                  ) : null}
                </div>
              ))}
            </div>
          </>
        )}

        <p className="poem-ink poem-folio mt-auto pt-[3%] text-center opacity-50">
          {pageNumber} / {totalPages}
        </p>
      </div>
    </div>
  );
}
