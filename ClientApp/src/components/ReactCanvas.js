import { useEffect, useRef } from "react";

const ReactCanvas = (props) => 
{
    const canvasRef = useRef(null);

    useEffect(() => 
    {
        const canvas = canvasRef.current;

        if (canvas) 
        {
            const ctx = canvas.getContext("2d");
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            ctx.beginPath();
            props.drawLines(ctx, props.people);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.stroke();
        }
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={props.className}
            style={{ border: "2px solid black" }}
        />
    );
};

export default ReactCanvas;