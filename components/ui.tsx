import type { ReactNode } from 'react';

export function StatCard({ label, value, subtext }: { label: string; value: string | number; subtext?: string }) {
  return (
    <section className="card stat-card">
      <p className="muted label">{label}</p>
      <h3>{value}</h3>
      {subtext ? <p className="tiny">{subtext}</p> : null}
    </section>
  );
}

export function SectionTitle({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <div className="section-title">
      <div>
        <h2>{title}</h2>
        {subtitle ? <p className="muted">{subtitle}</p> : null}
      </div>
      {right ? <div>{right}</div> : null}
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return <span className="pill">{children}</span>;
}

export function EmptyState({ title, copy }: { title: string; copy: string }) {
  return (
    <section className="card empty-state">
      <h3>{title}</h3>
      <p className="muted">{copy}</p>
    </section>
  );
}
