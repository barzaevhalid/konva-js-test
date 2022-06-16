import React from 'react';
import {useEffect, useRef, useState} from "react";
import {Text, Transformer} from "react-konva";

const RenderText = ({shapeProps, onChange}) => {
    const shapeRef = useRef();
    const trRef = useRef();
    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        if(shapeProps.text.length === 0) {
            setIsSelected(false)
        }

        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected, shapeProps]);

    return (
        <>
            <Text
                padding={5}
                onClick={() =>setIsSelected(!isSelected)}
                text={shapeProps.text}
                ref={shapeRef}
                draggable
                onDragEnd={(e) => {

                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={(e) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    node.scaleX();
                    node.scaleY();

                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY),
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </>
    )
};

export default RenderText;
