import type { Block } from "@/lib/insights-resources/types";

/** Renders structured body blocks. Heading levels start at H2 (the page owns the H1). */

function Inline({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <strong key={i} style={{ color: "var(--color-ink-primary)", fontWeight: 600 }}>
            {p}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

const textStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-body)",
  lineHeight: 1.75,
  color: "var(--color-ink-secondary)",
};

export default function Body({ blocks }: { blocks: Block[] }) {
  return (
    <div>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "p":
            return (
              <p key={i} style={{ ...textStyle, marginBottom: "1.25rem" }}>
                <Inline text={b.text} />
              </p>
            );
          case "h2":
            return (
              <h2
                key={i}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                  color: "var(--color-ink-primary)",
                  margin: "2.75rem 0 1rem",
                  border: "none",
                  padding: 0,
                }}
              >
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "var(--text-h3-sans)",
                  color: "var(--color-ink-primary)",
                  margin: "2rem 0 0.75rem",
                }}
              >
                {b.text}
              </h3>
            );
          case "ul":
          case "ol": {
            const Tag = b.t;
            return (
              <Tag
                key={i}
                style={{
                  ...textStyle,
                  margin: "0 0 1.5rem",
                  paddingLeft: "1.4rem",
                  listStyle: b.t === "ul" ? "disc" : "decimal",
                }}
              >
                {b.items.map((it, j) => (
                  <li key={j} style={{ marginBottom: "0.6rem", paddingLeft: "0.25rem" }}>
                    <Inline text={it} />
                  </li>
                ))}
              </Tag>
            );
          }
          case "callout":
            return (
              <aside
                key={i}
                style={{
                  margin: "2rem 0",
                  padding: "1.25rem 1.5rem",
                  borderLeft: "3px solid var(--color-cyan)",
                  background: "var(--color-bg-card)",
                  borderRadius: "0 8px 8px 0",
                  boxShadow: "0 1px 2px rgba(38,32,20,0.05), 0 8px 24px -16px rgba(38,32,20,0.18)",
                }}
              >
                {b.title && (
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-label)",
                      fontWeight: 600,
                      letterSpacing: "var(--tracking-eyebrow)",
                      textTransform: "uppercase",
                      color: "var(--color-cyan-ink)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {b.title}
                  </p>
                )}
                <p style={{ ...textStyle, marginBottom: 0, color: "var(--color-ink-primary)" }}>
                  <Inline text={b.text} />
                </p>
              </aside>
            );
          case "checklist":
            return (
              <div
                key={i}
                style={{
                  margin: "1.5rem 0 2rem",
                  padding: "1.25rem 1.5rem",
                  border: "1px solid var(--color-border-card)",
                  borderRadius: "12px",
                  background: "var(--color-bg-card)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-label)",
                    fontWeight: 600,
                    letterSpacing: "var(--tracking-eyebrow)",
                    textTransform: "uppercase",
                    color: "var(--color-ink-tertiary)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {b.title}
                </p>
                <ul className="list-none m-0 p-0">
                  {b.items.map((it, j) => (
                    <li key={j} className="flex gap-3 items-start" style={{ ...textStyle, marginBottom: "0.6rem" }}>
                      <span
                        aria-hidden="true"
                        style={{
                          flexShrink: 0,
                          width: 18,
                          height: 18,
                          marginTop: 5,
                          border: "1.5px solid var(--color-cyan-ink)",
                          borderRadius: 4,
                        }}
                      />
                      <span>
                        <Inline text={it} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto" style={{ margin: "1.5rem 0 2rem" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480, fontSize: "var(--text-body-sm, 0.9375rem)" }}>
                  <thead>
                    <tr>
                      {b.head.map((h) => (
                        <th
                          key={h}
                          scope="col"
                          style={{
                            textAlign: "left",
                            padding: "0.75rem 1rem",
                            borderBottom: "2px solid var(--color-ink-primary)",
                            fontFamily: "var(--font-body)",
                            fontWeight: 600,
                            color: "var(--color-ink-primary)",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, ri) => (
                      <tr key={ri}>
                        {r.map((c, ci) => (
                          <td
                            key={ci}
                            style={{
                              padding: "0.75rem 1rem",
                              borderBottom: "1px solid var(--color-border-card)",
                              verticalAlign: "top",
                              color: ci === 0 ? "var(--color-ink-primary)" : "var(--color-ink-secondary)",
                              fontWeight: ci === 0 ? 600 : 400,
                              lineHeight: 1.6,
                            }}
                          >
                            {c}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
