export default () => {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Orders</h1>
      <ul>
        <li><a href="/orders/1">Order 1</a></li>
        <li><a href="/orders/2">Order 2</a></li>
      </ul>
      <ul>
        <li><a href="/">Back</a></li>
      </ul>
    </div>
  );
}