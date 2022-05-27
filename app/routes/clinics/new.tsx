import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import type { Clinic } from "~/models/clinic";
import { formToClinic, save } from "~/models/clinic";

export const action: ActionFunction = async ({
  request,
}) => {
  const formData = await request.formData();
  const clinic = save(formToClinic(formData))
  return redirect(`/clinics/${clinic.id}`);
};

export const ClinicForm = ({ clinic }: { clinic: Clinic }) => {
  return (
    <>
      <input type="hidden" name="id" value={clinic.id} />
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" id="name" defaultValue={clinic.name} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="city" id="city" defaultValue={clinic.city} />
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          {clinic.id ? 'Update' : 'Create'}
        </button>
      </div>
    </>
  )
}

export default () => {
  return (
    <div className="w-full max-w-xs">
      <h1 className="py-2 align-center">New Clinic</h1>
      <form method="post" action="/clinics/new" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <ClinicForm clinic={{ name: '', city: '', id: '' }} />
      </form>
      <ul>
        <li><a href="/">Back</a></li>
      </ul>
    </div>
  );
}