import React, {
    ChangeEvent,
    DragEvent,
    FC,
    MouseEvent,
    useRef,
    useState,
} from "react";

const EventsExample: FC = () => {
    const [value, setValue] = useState<string>("");

    const [isDrag, setIsDrag] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        console.log(inputRef.current?.value)
    };

    const dragHandler = (e: DragEvent<HTMLDivElement>) => {
        // console.log(e)
    };

    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDrag(true);
    };
    const leaveHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDrag(false);
    };

    const dropHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDrag(true);
        console.log("changed");
    };
    return (
        <div>
            <input value={value} onChange={changeHandler} type="text" placeholder="Управляемый"/>
            <input ref={inputRef} type="text" placeholder="Не управляемый"/>
            <button onClick={clickHandler}>a</button>

            <div
                onDrag={dragHandler}
                draggable
                style={{ width: "200px", height: "200px", background: "red" }}
            ></div>
            <div
                onDrop={dropHandler}
                onDragLeave={leaveHandler}
                onDragOver={dragOverHandler}
                style={{
                    width: "200px",
                    height: "200px",
                    background: isDrag ? "red" : "blue",
                    marginTop: "15px",
                }}
            ></div>
        </div>
    );
};

export default EventsExample;
