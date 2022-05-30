import { Link } from "@remix-run/react";

export default () => {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Orders</h1>
      <ul>
        <li><a href="/orders/1">Order 1</a></li>
        <li><a href="/orders/2">Order 2</a></li>
      </ul>
      <ul className="link-list">
        <li><Link className="btn-blue" to={`/`}>Back</Link></li>
      </ul>
    </div>
  );
}