import { json, type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { Clinic } from "~/models/clinic"
import { find } from "~/models/clinic"

export type LoaderData = { clinic: Clinic }

function invariant(condition: any | undefined, msg: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, 'Expected params.slug')
  const clinic = find(params.slug)
  invariant(clinic, `Expected clinic for '${params.slug}'`)
  return json({ clinic })
};

export default function ClinicSlug() {
  const { clinic } = useLoaderData<LoaderData>()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>{clinic.name}, {clinic.city}</h1>
      <ul className="link-list">
        <li><Link className="btn-blue" to={`/clinics/edit/${clinic.id}`}>Edit</Link></li>
        <li><Link className="btn-blue" to="/clinics">Back</Link></li>
      </ul>
    </div>
  )
}
