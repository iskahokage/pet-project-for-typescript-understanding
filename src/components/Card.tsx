import React, { FC, ReactChild, ReactNode, useState } from 'react';

export enum cardVariant{
    primary = 'primary',
    outlined = 'outlined'
}

interface CardProps {
    width?: string,
    minHeight?: string,
    children?: ReactNode,
    onClick: (num: number) => void,
    variant?: cardVariant,
    margin?: string,
}

const Card: FC <CardProps> = ({onClick, width, minHeight, children, margin}) => {

    const [state, setState] = useState(0)

    return (
        <div style={{width, minHeight, margin, background: 'gray'}}
            onClick={()=>onClick(state)}
        >
            {children}
        </div>
    );
};

export default Card;