"use client";

import { deletePortfolio } from "@/app/actions";

export default function DeletePortfolioButton({ id, name }: { id: string; name: string }) {
  return <form action={deletePortfolio} onSubmit={(event) => {
    if (!window.confirm(`Move “${name}” to Recently Deleted? Your portfolio information and images will be kept so you can restore it.`)) event.preventDefault();
  }}><input type="hidden" name="id" value={id} /><button className="danger-button" type="submit">Delete</button></form>;
}
