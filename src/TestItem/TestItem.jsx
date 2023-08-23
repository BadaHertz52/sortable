import React from "react";
import "./TestItem.css";
function TestItem({ data, index }) {
  if (!data?.content) {
    console.log(data, index);
  }
  return (
    <div className="test-item">
      <div>
        <p>content:{data.content}</p>
        <p>index:{index}</p>
      </div>
    </div>
  );
}

export default TestItem;
