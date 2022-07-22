import { useEffect } from "react";
import "./sig.scss";

function SigInComponent({ doSign }) {
    useEffect(() => {
        (function () {
            const requestAnimFrame = (function (callback) {
                return (
                    window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.requestAnimationFrame ||
                    window.requestAnimationFrame ||
                    function (callback) {
                        window.setTimeout(callback, 1000 / 60);
                    }
                );
            })();

            var canvas = document.getElementById("sig_canvas");
            var ctx = canvas.getContext("2d");
            ctx.strokeStyle = "#222222";
            ctx.lineWidth = 4;

            var drawing = false;
            var mousePos = {
                x: 0,
                y: 0,
            };
            var lastPos = mousePos;

            canvas.addEventListener(
                "mousedown",
                function (e) {
                    drawing = true;
                    lastPos = getMousePos(canvas, e);
                },
                false
            );

            canvas.addEventListener(
                "mouseup",
                function (e) {
                    drawing = false;
                },
                false
            );

            canvas.addEventListener(
                "mousemove",
                function (e) {
                    mousePos = getMousePos(canvas, e);
                },
                false
            );

            // Add touch event support for mobile
            canvas.addEventListener("touchstart", function (e) {}, false);

            canvas.addEventListener(
                "touchmove",
                function (e) {
                    var touch = e.touches[0];
                    var me = new MouseEvent("mousemove", {
                        clientX: touch.clientX,
                        clientY: touch.clientY,
                    });
                    canvas.dispatchEvent(me);
                },
                false
            );

            canvas.addEventListener(
                "touchstart",
                function (e) {
                    mousePos = getTouchPos(canvas, e);
                    var touch = e.touches[0];
                    var me = new MouseEvent("mousedown", {
                        clientX: touch.clientX,
                        clientY: touch.clientY,
                    });
                    canvas.dispatchEvent(me);
                },
                false
            );

            canvas.addEventListener(
                "touchend",
                function (e) {
                    var me = new MouseEvent("mouseup", {});
                    canvas.dispatchEvent(me);
                },
                false
            );

            function getMousePos(canvasDom, mouseEvent) {
                var rect = canvasDom.getBoundingClientRect();
                return {
                    x: mouseEvent.clientX - rect.left,
                    y: mouseEvent.clientY - rect.top,
                };
            }

            function getTouchPos(canvasDom, touchEvent) {
                var rect = canvasDom.getBoundingClientRect();
                return {
                    x: touchEvent.touches[0].clientX - rect.left,
                    y: touchEvent.touches[0].clientY - rect.top,
                };
            }

            function renderCanvas() {
                if (drawing) {
                    ctx.moveTo(lastPos.x, lastPos.y);
                    ctx.lineTo(mousePos.x, mousePos.y);
                    ctx.stroke();
                    lastPos = mousePos;
                }
            }

            // Prevent scrolling when touching the canvas
            document.body.addEventListener(
                "touchstart",
                function (e) {
                    if (e.target == canvas) {
                        e.preventDefault();
                    }
                },
                false
            );
            document.body.addEventListener(
                "touchend",
                function (e) {
                    if (e.target == canvas) {
                        e.preventDefault();
                    }
                },
                false
            );
            document.body.addEventListener(
                "touchmove",
                function (e) {
                    if (e.target == canvas) {
                        e.preventDefault();
                    }
                },
                false
            );

            (function drawLoop() {
                requestAnimFrame(drawLoop);
                renderCanvas();
            })();

            function clearCanvas() {
                canvas.width = canvas.width;
            }

            // Set up the UI
            // var sigText = document.getElementById("sig-dataUrl");
            // var sigImage = document.getElementById("sig-image");
            var clearBtn = document.getElementById("sig-clearBtn");
            var submitBtn = document.getElementById("sig-submitBtn");

            clearBtn.addEventListener(
                "click",
                function (e) {
                    clearCanvas();
                    // sigText.innerHTML =
                    //     "Data URL for your signature will go here!";
                    // sigImage.setAttribute("src", "");
                },
                false
            );
            submitBtn.addEventListener(
                "click",
                function (e) {
                    var dataUrl = canvas.toDataURL();
                    // sigText.innerHTML = dataUrl;
                    // sigImage.setAttribute("src", dataUrl);
                    if (
                        dataUrl !==
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABGJJREFUeF7t1AEJAAAMAsHZv/RyPNwSyDncOQIECEQEFskpJgECBM5geQICBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAgQdWMQCX4yW9owAAAABJRU5ErkJggg=="
                    ) {
                        console.log("the value:", dataUrl);
                        doSign(dataUrl);
                    } else {
                        console.log("is emptyyyy!");
                    }
                },
                false
            );
        })();
    }, []);

    return (
        <div className="sig_container">
            {/* <!-- Content --> */}
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>E-Signature</h1>
                        <p>Veillez entrer votre signature!</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <canvas id="sig_canvas">
                            {/* <canvas id="sig_canvas" width="620" height="160"> */}
                            Get a better browser, bro.
                        </canvas>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button
                            className="btn btn-primary"
                            id="sig-submitBtn"
                            style={{ marginRight: "10px" }}
                        >
                            Soumettre
                        </button>
                        <button className="btn btn-default" id="sig-clearBtn">
                            Effacer
                        </button>
                    </div>
                </div>
                {/* <br />
                <div className="row">
                    <div className="col-md-12">
                        <textarea
                            id="sig-dataUrl"
                            className="form-control"
                            // rows="5"
                            defaultValue={
                                "Data URL for your signature will go here!"
                            }
                        />
                    </div>
                </div> */}
                {/* <br />
                <div className="row">
                    <div className="col-md-12">
                        <img
                            id="sig-image"
                            src=""
                            alt="Your signature will go here!"
                        />
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default SigInComponent;
