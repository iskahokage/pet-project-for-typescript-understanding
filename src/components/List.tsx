import React, { FC, ReactNode } from "react";

interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => ReactNode;
}

export default function List<T>(props: ListProps<T>) {
    return (
        <div style={{ display: "flex", flexWrap: "wrap"}}>
            {props.items.map(props.renderItem)}
        </div>
    );
}
