import React, {useEffect, useRef, useState} from 'react';
import { Stage, Layer, Text, Transformer } from 'react-konva';

import  "./App.css"

const RenderText = ({shapeProps, onSelect, onChange}) => {
    const shapeRef = useRef();
    const trRef = useRef();
    const [isSelected, setIsSelected] = useState(false)
    useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);
    return (
        <>
        <Text
            padding={5}
            onDblClick={() =>setIsSelected(!isSelected)}
            text={shapeProps.text}
            onClick={onSelect}
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
}
const App = () => {

    const text1 = {
        x: 50,
        y: 100,
        fontSize: 30,
        text: '"Вывод кликни 2 раза"',
        draggable: true,
    }
    const [text, setText] = useState(text1)
    const [textHide, setTextHide] = useState(false)

    const fixText = (e) => {
        setText({ ...text1, text: e.target.value })
    }
    const stageRef = useRef(null)
    const link = useRef(null)
    const upload = () => {
        const url = stageRef.current.toDataURL({pixelRatio: 1 });
        link.current.href = url
    }
    const hideText = () => {
        setTextHide(!textHide)
        setText({ ...text1, text: text1.text})

    }

    return (
        <div className='container'>
            <div className='textBlock'>
               {textHide &&  <textarea name="text" onChange={(e) => fixText(e)}></textarea>}
              <div>
                  <button onClick={hideText}>{ textHide ? "Закрыть поле" : "Открыть поле ввода текста"}</button>
                  {textHide &&  <a download="stage.png"  name='stage.png' ref={link}><button onClick={upload} >Сохранить</button></a>}
              </div>
            </div>

            <div className='canvas'>
              <Stage width={500} height={500}  ref={stageRef}>
                  <Layer>
                      {textHide && <RenderText
                          shapeProps={text}
                          onChange={(newAtrs) => setText(newAtrs)}
                      />}
                  </Layer>
              </Stage>
          </div>
        </div>
    );
};

export default App;
