import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut, togglePublished } from "@/app/actions";
import DeletePortfolioButton from "./DeletePortfolioButton";
import RecoveryActions from "./RecoveryActions";
import { portfolioMediaUrl } from "@/lib/portfolio-media";

export const dynamic = "force-dynamic";
type Props = { searchParams: Promise<{ message?: string; error?: string; view?: string }> };

export default async function DashboardPage({ searchParams }: Props) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims?.sub) redirect("/login");
  const userId = claimsData.claims.sub;
  const params = await searchParams;
  const isRecovery = params.view === "recovery";
  const [{ data: portfolios, error }, { data: userData }] = await Promise.all([
    (isRecovery
      ? supabase.from("portfolios").select("id,slug,full_name,role,template_key,is_published,profile_photo_path,created_at,deleted_at").eq("user_id", userId).not("deleted_at", "is", null)
      : supabase.from("portfolios").select("id,slug,full_name,role,template_key,is_published,profile_photo_path,created_at,deleted_at").eq("user_id", userId).is("deleted_at", null)
    ).order("created_at", { ascending: false }),
    supabase.auth.getUser(),
  ]);
  const templatesHref = !isRecovery && portfolios?.[0] ? `/dashboard/${portfolios[0].id}/templates` : "/home#templates";
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
          <Link className={!isRecovery ? "is-current" : undefined} href="/dashboard" aria-current={!isRecovery ? "page" : undefined}><span aria-hidden="true">▣</span>My Portfolio</Link>
          <Link href="/dashboard/new"><span aria-hidden="true">＋</span>Create New</Link>
          <Link href={templatesHref}><span aria-hidden="true">▦</span>Templates</Link>
          <Link className={isRecovery ? "is-current" : undefined} href="/dashboard?view=recovery" aria-current={isRecovery ? "page" : undefined}><span aria-hidden="true">↶</span>Recovery</Link>
        </nav>
        <div className="dashboard-sidebar-user"><span className="dashboard-user-avatar" aria-hidden="true">{displayName.slice(0, 1).toUpperCase()}</span><span>{displayName}<small>Portfolio workspace</small></span></div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="dashboard-topbar-user"><span className="dashboard-user-avatar" aria-hidden="true">{displayName.slice(0, 1).toUpperCase()}</span><span>{displayName}</span></div>
          <form action={signOut}><button className="button button-quiet" type="submit">Sign out</button></form>
        </header>

        <main className="dashboard-wrap">
          <div className="dashboard-top"><div><span className="eyebrow">YOUR CREATIVE WORKSPACE</span><h1>{isRecovery ? "Recovery Mode" : "My Portfolio"}</h1><p>{isRecovery ? "Restore a portfolio with its saved design, details, and images." : "Manage your saved portfolios. Preview, edit, change designs, and publish when ready."}</p></div>{!isRecovery && <Link className="button button-primary" href="/dashboard/new">＋ Create New Portfolio</Link>}</div>
          <nav className="portfolio-view-tabs" aria-label="Portfolio views"><Link className={!isRecovery ? "is-active" : undefined} href="/dashboard">Active Portfolios</Link><Link className={isRecovery ? "is-active" : undefined} href="/dashboard?view=recovery">Recovery</Link></nav>
          {params.message && <p className="form-message" role="status">{params.message}</p>}
          {params.error && <p className="form-message" role="alert">{params.error}</p>}
          {error && <p className="form-message" role="alert">{error.message}</p>}

          <div className="portfolio-list">
            {portfolioCards.map(({ portfolio, photoUrl }) => {
              const templateLabel = portfolio.template_key === "minimal" ? "Simple" : portfolio.template_key.charAt(0).toUpperCase() + portfolio.template_key.slice(1);

              return (
                <article className="portfolio-item" key={portfolio.id}>
                  <div className="portfolio-thumb" role={photoUrl ? "img" : undefined} aria-label={photoUrl ? `Profile photo of ${portfolio.full_name}` : undefined} style={photoUrl ? { backgroundImage: `url("${photoUrl}")` } : undefined}>{!photoUrl && portfolio.full_name.slice(0, 1).toUpperCase()}</div>
                  <div className="portfolio-item-copy"><h2>{portfolio.full_name}</h2><p>{portfolio.role || "Portfolio"} · {templateLabel} · {isRecovery ? `Deleted ${new Date(portfolio.deleted_at!).toLocaleDateString()}` : portfolio.is_published ? "Published" : "Private"}</p></div>
                  {isRecovery ? <RecoveryActions id={portfolio.id} name={portfolio.full_name} /> : <div className="portfolio-item-actions portfolio-item-links" aria-label={`Actions for ${portfolio.full_name}`}>
                    <Link className="secondary-button" href={`/dashboard/${portfolio.id}/preview/${portfolio.template_key}`}>◉ Preview</Link>
                    <Link className="secondary-button" href={`/dashboard/${portfolio.id}/edit`}>✎ Edit</Link>
                    <Link className="secondary-button" href={`/dashboard/${portfolio.id}/templates`}>▦ Choose design</Link>
                    {portfolio.is_published && <Link className="secondary-button" href={`/p/${portfolio.slug}`} target="_blank" rel="noreferrer">↗ View public page</Link>}
                    <form action={togglePublished}><input type="hidden" name="id" value={portfolio.id} /><input type="hidden" name="published" value={String(portfolio.is_published)} /><button type="submit">{portfolio.is_published ? "Make private" : "Publish"}</button></form>
                    <DeletePortfolioButton id={portfolio.id} name={portfolio.full_name} />
                  </div>}
                </article>
              );
            })}
            {!error && portfolios?.length === 0 && <section className="glass-card dashboard-empty"><h2>{isRecovery ? "Nothing in Recovery" : "Your first portfolio starts here."}</h2><p>{isRecovery ? "Portfolios you move to Recently Deleted will appear here. Restoring one keeps its saved information, template, and images." : "Add your profile, skills, and project ideas, then choose a forest-inspired design."}</p>{!isRecovery && <Link className="button button-primary" href="/dashboard/new">＋ Create a portfolio</Link>}</section>}
          </div>

        </main>
      </div>
    </div>
  );
}
