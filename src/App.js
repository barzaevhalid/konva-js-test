import React, {useEffect, useRef, useState} from 'react';
import { Stage, Layer, Text, Transformer } from 'react-konva';

import  "./App.css"
import RenderText from "./RenderText";

const App = () => {

    const text1 = {
        x: 50,
        y: 100,
        fontSize: 30,
        text: '"Кликни 1 раз"',
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
    const fer = useRef(null)
    console.log(fer)
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
                  <Layer ref={fer}>
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
