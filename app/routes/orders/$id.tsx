import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

interface Props {
  params: {
    id: string
  }
}

export const loader = ({ params }: Props) => {
  return json({
    id: params.id,
    name: `Order ${params.id}`
  })
};

export default function OrderId() {
  const { name } = useLoaderData()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>{name}</h1>
      <ul>
        <li><a href="/orders">Back</a></li>
      </ul>
    </div>
  )
}
