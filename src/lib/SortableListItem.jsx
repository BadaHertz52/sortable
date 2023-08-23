import React, { useEffect, useRef, useState } from "react";

function SortableListItem({
  index,
  draggable,
  children,
  onDragStart,
  onDropItem,
  onClickItem,
  mobileDrag,
  setMobileDrag,
  startIndex,
}) {
  let timeout = undefined;
  const itemRef = useRef(null);
  const onDragStartItem = () => {
    itemRef.current.classList.add("dragstart");
    onDragStart(index);
  };
  const onDragEnd = () => {
    itemRef.current.classList.remove("dragstart");
  };
  const onDragEnter = () => {
    itemRef.current.classList.add("dragover");
  };
  const onDragLeave = () => {
    itemRef.current.classList.remove("dragover");
  };
  /**
   * onDrop 의 선행 조건
   */
  const onDragOver = (event) => event.preventDefault();
  const onDrop = () => {
    itemRef.current.classList.remove("dragover");
    onDropItem(index);
  };
  const onClick = () => onClickItem(index);
  const onTouchStart = () => {
    if (!mobileDrag) {
      timeout = setTimeout(() => {
        setMobileDrag(true);
        onDragStartItem();
      }, 1000);
    }
  };
  const onTouchEnd = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
  };
  return (
    <li
      ref={itemRef}
      className="item"
      id={`sortableList_item_${index}`}
      draggable={draggable || false}
      onDragStart={onDragStartItem}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
      onMouseEnter={() => itemRef.current?.classList.add("on")}
      onMouseLeave={() => itemRef.current?.classList.remove("on")}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </li>
  );
}

export default SortableListItem;
