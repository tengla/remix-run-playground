import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { Clinic } from "~/models/clinic";
import { all } from "~/models/clinic";

export const loader: LoaderFunction = async () => {
  const clinics = await all()
  return json({ clinics })
};

type LoaderData = { clinics: Clinic[] }

export default () => {
  const { clinics } = useLoaderData<LoaderData>()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h2>Clinics</h2>
      <ul>
        {clinics.map(clinic => {
          return <li key={clinic.id}><a href={`/clinics/${clinic.id}`}>{clinic.name}</a></li>
        })}
      </ul>
      <ul className='link-list'>
        <li><Link className='btn-blue' to="/clinics/new">New Clinic</Link></li>
      </ul>
    </div>
  );
}