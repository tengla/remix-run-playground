import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Foo Bar",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="bg-slate-50 border-gray-400 p-5">
          <ul className="flex">
          <li className="mr-6">
              <a className="text-blue-500 hover:text-blue-800 hover:underline" href="/">Home</a>
            </li>
            <li className="mr-6">
              <a className="text-blue-500 hover:text-blue-800 hover:underline" href="/orders">Orders</a>
            </li>
            <li className="mr-6">
              <a className="text-blue-500 hover:text-blue-800 hover:underline" href="/clinics">
                Clinics
              </a>
            </li>
          </ul>
          <hr />
          <div className="py-5">
            <Outlet />
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
