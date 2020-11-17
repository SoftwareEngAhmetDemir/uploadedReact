import React, { useState, useContext } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { AuthContext } from "../../Context/AuthContext";

const SortableItem = SortableElement(({ value }) => (
    <li tabIndex={0} className="img-gallery"><img src={value} width={150} height={100} /></li>
));

const SortableList = SortableContainer(({ items }) => {
    return (
        <ul>
            {items.map((value, index) => (
                <SortableItem key={`item-${value}`} index={index} value={value} />
            ))}
        </ul>
    );
});

export default function SortableComponent(props) {
    const { user, gState, seTgState } = useContext(AuthContext);


    const onSortEnd = ({ oldIndex, newIndex }) => {

        seTgState(({ imagesOrder }) => ({
            imagesOrder: arrayMove(imagesOrder, oldIndex, newIndex)
        }));


    };

    return <SortableList axis="xy" items={gState.imagesOrder} onSortEnd={onSortEnd} />;

}

