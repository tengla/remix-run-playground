import type { ActionFunction, LoaderFunction} from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react'
import { find, update, formToClinic } from '~/models/clinic';
import type { LoaderData } from '../$slug'
import { ClinicForm } from '../new'

export const action: ActionFunction = async ({
  request,
}) => {
  const formData = await request.formData();
  const clinic = formToClinic(formData)
  update(clinic)
  return redirect(`/clinics/${clinic.id}`);
};

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

export default () => {
  const { clinic } = useLoaderData<LoaderData>()
  return (
    <div className="w-full max-w-xs">
      <h1 className="py-2 align-center">Edit clinic {clinic.name}</h1>
      <form method="post" action={`/clinics/edit/${clinic.id}`} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <ClinicForm clinic={clinic}/>
      </form>
      <ul className="link-list">
        <li><Link className="btn-blue" to={`/clinics/${clinic.id}`}>Back</Link></li>
      </ul>
    </div>
  )
}