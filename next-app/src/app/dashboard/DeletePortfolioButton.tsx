"use client";

import { deletePortfolio } from "@/app/actions";

export default function DeletePortfolioButton({ id, name }: { id: string; name: string }) {
  return <form action={deletePortfolio} onSubmit={(event) => {
    if (!window.confirm(`Permanently delete “${name}” and its saved portfolio details?`)) event.preventDefault();
  }}><input type="hidden" name="id" value={id} /><button className="danger-button" type="submit">Delete</button></form>;
}
