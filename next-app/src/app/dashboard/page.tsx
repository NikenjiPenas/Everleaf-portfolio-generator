import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut, togglePublished } from "@/app/actions";
import DeletePortfolioButton from "./DeletePortfolioButton";

export const dynamic = "force-dynamic";
type Props = { searchParams: Promise<{ message?: string; error?: string }> };

export default async function DashboardPage({ searchParams }: Props) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims?.sub) redirect("/login");
  const userId = claimsData.claims.sub;
  const { data: portfolios, error } = await supabase.from("portfolios").select("id,slug,full_name,role,template_key,is_published,profile_photo_path,created_at").eq("user_id", userId).order("created_at", { ascending: false });
  const params = await searchParams;
  return <main className="dashboard-wrap"><div className="dashboard-top"><div><span className="eyebrow">YOUR CREATIVE WORKSPACE</span><h1>My Portfolio</h1><p>Manage your portfolio, preview designs, and share when ready.</p></div><div className="header-actions"><Link className="button button-primary" href="/dashboard/new">＋ Create portfolio</Link><form action={signOut}><button className="button button-quiet" type="submit">Sign out</button></form></div></div>{params.message && <p className="form-message" role="status">{params.message}</p>}{params.error && <p className="form-message" role="alert">{params.error}</p>}{error && <p className="form-message" role="alert">{error.message}</p>}<div className="portfolio-list">{portfolios?.map((portfolio) => { const photoUrl = portfolio.profile_photo_path ? supabase.storage.from(process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET || "portfolio-media").getPublicUrl(portfolio.profile_photo_path).data.publicUrl : undefined; return <article className="portfolio-item" key={portfolio.id}><div className="portfolio-thumb" style={photoUrl ? { backgroundImage: `url("${photoUrl}")` } : undefined}>{!photoUrl && portfolio.full_name.slice(0,1).toUpperCase()}</div><div className="portfolio-item-copy"><h2>{portfolio.full_name}</h2><p>{portfolio.role || "Portfolio"} · {portfolio.template_key} · {portfolio.is_published ? "Published" : "Private"}</p><Link className="text-link" href={`/dashboard/${portfolio.id}/edit`}>Edit portfolio ↗</Link><Link className="text-link" href={`/dashboard/${portfolio.id}/templates`}>Choose a design ↗</Link><Link className="text-link" href={`/dashboard/${portfolio.id}/preview/${portfolio.template_key}`}>Preview ↗</Link>{portfolio.is_published && <Link className="text-link" href={`/p/${portfolio.slug}`}>Open public page ↗</Link>}</div><div className="portfolio-item-actions"><form action={togglePublished}><input type="hidden" name="id" value={portfolio.id} /><input type="hidden" name="published" value={String(portfolio.is_published)} /><button type="submit">{portfolio.is_published ? "Make private" : "Publish"}</button></form><DeletePortfolioButton id={portfolio.id} name={portfolio.full_name} /></div></article>; })}{!error && portfolios?.length === 0 && <section className="glass-card"><h2>Your first portfolio starts here.</h2><p>Add your profile, skills, and project ideas, then choose a forest-inspired design.</p><Link className="button button-primary" href="/dashboard/new">Create a portfolio →</Link></section>}</div></main>;
}
