import React, { useCallback, useEffect, useRef, useState } from "react";
import "./SortableList.css";
import SortableListItem from "./SortableListItem";
function SortableList({
  data,
  onClickItem,
  renderItem,
  updateData,
  dragItemStyleProps = undefined
}) {
  const listRef = useRef(null);
  /**
   * drag되는 item 의 index
   */
  const [startIndex, setStartIndex] = useState(0);
  const [listData, setListData] = useState(data);
  const [mobileDrag, setMobileDrag] = useState(false);
  const basicDragItemStyle = {
    position: "absolute",
    opacity: 0.5,
    top: "110%",
    left: 0
  };
  const initialDragItemStyle = dragItemStyleProps ? {
    ...basicDragItemStyle,
    ...dragItemStyleProps
  } : basicDragItemStyle;
  const [dragItemStyle, setDragItemStyle] = useState(initialDragItemStyle);
  const [dataPositionArray, setDataPositionArray] = useState(undefined);
  const onDragStart = index => setStartIndex(index);
  /**
   *
   * @param  dropIndex  : drag 되는 item의 drop될 위치의 index
   */
  const onDropItem = useCallback(dropIndex => {
    const dragItem = listData[startIndex];
    const list = [...listData];
    list.splice(startIndex, 1);
    list.splice(dropIndex, 0, dragItem);
    setListData(list);
    updateData && updateData(list);
  }, [startIndex, listData, updateData]);
  const onTouchEnd = () => {
    if (mobileDrag) {
      const dropIndex = document.querySelector(".dragover").id.replace("sortableList_item_", "");
      onDropItem(dropIndex);
      document.querySelector(".dragover")?.classList.remove("dragover");
      document.querySelector(".dragstart")?.classList.remove("dragstart");
      setMobileDrag(false);
    }
  };
  const onTouchMove = event => {
    if (mobileDrag && dataPositionArray) {
      const itemHeight = document.querySelector(".sortable-list .item").clientHeight;
      if (itemHeight && listRef.current) {
        const listTop = listRef.current.getBoundingClientRect().top;
        const top = event.touches[0].clientY - listTop;
        const bottom = top + itemHeight;
        setDragItemStyle({
          ...initialDragItemStyle,
          top: top + itemHeight * 0.5
        });
        const target = dataPositionArray.filter(e => e.y <= bottom && e.y >= top)[0];
        if (target && !target.element?.classList?.contains("dragOver")) {
          document.querySelector(".dragover")?.classList.remove("dragover");
          target.element.classList.add("dragover");
        }
      }
    }
  };
  useEffect(() => {
    if (mobileDrag && listRef.current) {
      const listElTop = listRef.current.getClientRects()[0].top;
      const item = [...document.querySelectorAll(".sortable-list .item")].map((e, i) => ({
        element: e,
        y: e.getClientRects()[0].top - listElTop
      }));
      setDataPositionArray(item);
    }
  }, [mobileDrag]);
  return /*#__PURE__*/React.createElement("ul", {
    className: "sortable-list",
    ref: listRef,
    onTouchMove: onTouchMove,
    onTouchEnd: onTouchEnd
  }, listData.map((item, index) => /*#__PURE__*/React.createElement(SortableListItem, {
    key: index,
    index: index,
    draggable: true,
    onDropItem: onDropItem,
    onDragStart: onDragStart,
    onClickItem: onClickItem,
    mobileDrag: mobileDrag,
    setMobileDrag: setMobileDrag,
    startIndex: startIndex
  }, renderItem(item, index))), /*#__PURE__*/React.createElement(SortableListItem, {
    key: listData.length,
    index: listData.length,
    draggable: false,
    onDropItem: onDropItem,
    mobileDrag: mobileDrag,
    setMobileDrag: setMobileDrag,
    startIndex: startIndex
  }), mobileDrag && /*#__PURE__*/React.createElement("div", {
    className: "drag-item",
    style: dragItemStyle
  }, /*#__PURE__*/React.createElement(SortableListItem, {
    key: listData.length,
    index: startIndex,
    draggable: false,
    onDropItem: onDropItem,
    mobileDrag: mobileDrag,
    setMobileDrag: setMobileDrag,
    startIndex: startIndex
  }, renderItem(listData[startIndex], startIndex))));
}
export default SortableList;