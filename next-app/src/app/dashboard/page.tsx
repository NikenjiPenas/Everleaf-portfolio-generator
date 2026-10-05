import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut, togglePublished } from "@/app/actions";
import DeletePortfolioButton from "./DeletePortfolioButton";
import ThemeToggle from "../ThemeToggle";
import { portfolioMediaUrl } from "@/lib/portfolio-media";

export const dynamic = "force-dynamic";
type Props = { searchParams: Promise<{ message?: string; error?: string }> };

export default async function DashboardPage({ searchParams }: Props) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims?.sub) redirect("/login");
  const userId = claimsData.claims.sub;
  const [{ data: portfolios, error }, { data: userData }] = await Promise.all([
    supabase.from("portfolios").select("id,slug,full_name,role,template_key,is_published,profile_photo_path,created_at").eq("user_id", userId).order("created_at", { ascending: false }),
    supabase.auth.getUser(),
  ]);
  const params = await searchParams;
  const templatesHref = portfolios?.[0] ? `/dashboard/${portfolios[0].id}/templates` : "/home#templates";
  const displayName = String(userData.user?.user_metadata?.full_name || userData.user?.email?.split("@")[0] || "Portfolio workspace");
  const portfolioCards = await Promise.all((portfolios ?? []).map(async (portfolio) => ({
    portfolio,
    photoUrl: await portfolioMediaUrl(supabase, portfolio.profile_photo_path),
  })));

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <Link className="dashboard-brand" href="/home" aria-label="EverLeaf home"><span className="brand-mark">E</span><span>EverLeaf</span></Link>
        <nav className="dashboard-nav" aria-label="Portfolio workspace">
          <Link href="/home"><span aria-hidden="true">⌂</span>Home</Link>
          <Link className="is-current" href="/dashboard" aria-current="page"><span aria-hidden="true">▣</span>My Portfolio</Link>
          <Link href="/dashboard/new"><span aria-hidden="true">＋</span>Create New</Link>
          <Link href={templatesHref}><span aria-hidden="true">▦</span>Templates</Link>
        </nav>
        <div className="dashboard-sidebar-user"><span className="dashboard-user-avatar" aria-hidden="true">{displayName.slice(0, 1).toUpperCase()}</span><span>{displayName}<small>Portfolio workspace</small></span></div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="dashboard-topbar-user"><span className="dashboard-user-avatar" aria-hidden="true">{displayName.slice(0, 1).toUpperCase()}</span><span>{displayName}</span></div>
          <form action={signOut}><button className="button button-quiet" type="submit">Sign out</button></form>
          <ThemeToggle placement="header" />
        </header>

        <main className="dashboard-wrap">
          <div className="dashboard-top"><div><span className="eyebrow">YOUR CREATIVE WORKSPACE</span><h1>My Portfolio</h1><p>Manage your saved portfolios. Preview, edit, change designs, and publish when ready.</p></div><Link className="button button-primary" href="/dashboard/new">＋ Create New Portfolio</Link></div>
          {params.message && <p className="form-message" role="status">{params.message}</p>}
          {params.error && <p className="form-message" role="alert">{params.error}</p>}
          {error && <p className="form-message" role="alert">{error.message}</p>}

          <div className="portfolio-list">
            {portfolioCards.map(({ portfolio, photoUrl }) => {
              const templateLabel = portfolio.template_key === "minimal" ? "Simple" : portfolio.template_key.charAt(0).toUpperCase() + portfolio.template_key.slice(1);

              return (
                <article className="portfolio-item" key={portfolio.id}>
                  <div className="portfolio-thumb" role={photoUrl ? "img" : undefined} aria-label={photoUrl ? `Profile photo of ${portfolio.full_name}` : undefined} style={photoUrl ? { backgroundImage: `url("${photoUrl}")` } : undefined}>{!photoUrl && portfolio.full_name.slice(0, 1).toUpperCase()}</div>
                  <div className="portfolio-item-copy"><h2>{portfolio.full_name}</h2><p>{portfolio.role || "Portfolio"} · {templateLabel} · {portfolio.is_published ? "Published" : "Private"}</p></div>
                  <div className="portfolio-item-actions portfolio-item-links" aria-label={`Actions for ${portfolio.full_name}`}>
                    <Link className="secondary-button" href={`/dashboard/${portfolio.id}/preview/${portfolio.template_key}`}>◉ Preview</Link>
                    <Link className="secondary-button" href={`/dashboard/${portfolio.id}/edit`}>✎ Edit</Link>
                    <Link className="secondary-button" href={`/dashboard/${portfolio.id}/templates`}>▦ Choose design</Link>
                    {portfolio.is_published && <Link className="secondary-button" href={`/p/${portfolio.slug}`} target="_blank" rel="noreferrer">↗ View public page</Link>}
                    <form action={togglePublished}><input type="hidden" name="id" value={portfolio.id} /><input type="hidden" name="published" value={String(portfolio.is_published)} /><button type="submit">{portfolio.is_published ? "Make private" : "Publish"}</button></form>
                    <DeletePortfolioButton id={portfolio.id} name={portfolio.full_name} />
                  </div>
                </article>
              );
            })}
            {!error && portfolios?.length === 0 && <section className="glass-card dashboard-empty"><h2>Your first portfolio starts here.</h2><p>Add your profile, skills, and project ideas, then choose a forest-inspired design.</p><Link className="button button-primary" href="/dashboard/new">＋ Create a portfolio</Link></section>}
          </div>

          <section className="recovery-panel" aria-labelledby="recovery-heading"><div><h2 id="recovery-heading">Recently deleted</h2><p>Portfolio recovery is not enabled yet.</p></div><div className="recovery-empty">Deleting a portfolio currently removes it permanently. I’m keeping this clear so you don’t expect deleted work to be recoverable.</div></section>
        </main>
      </div>
    </div>
  );
}
