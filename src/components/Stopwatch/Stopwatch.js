import { useState } from "react";

const Stopwatch = () => {
    const [timer, setTimer] = useState({ hr: 0, m: 0, s: 0,ms:0 });
    const [inter, setInter] = useState();

    var uphr = timer.hr,
        upm = timer.m,
        ups = timer.s,
        upms = timer.ms;
    
    const run = () => {
        if (upms === 36) {
            upms = 0;
            ups++;
          }
        if (ups === 60) {
            ups = 0;
            upm++;
          }
        if (upm === 60) {
            upm = 0;
            uphr++;
          }
          upms++;
        //   console.log(upms, ups, upm);
        setTimer({ hr: uphr, m: upm, s: ups, ms: upms });
    }

    // for disable reset button
    const [isDisabled, setIsDisabled] = useState(true);
    // for render start btn
    const [start, setStart] = useState(true);
    // for render pause btn
    const [pause, setPause] = useState(false);
    // for render resume btn
    const [resume, setResume] = useState(false);

    //  click event for start btn
    const clickStart = () => {
        setIsDisabled(!isDisabled)
        setStart(false)
        setPause(true)
        run()
        setInter(setInterval(run, 20));
    }
    
    // click event for pause btn
    const clickPause = () => {
        setPause(false)
        setResume(true)
        clearInterval(inter)
    }

    // click event for pause btn
    const clickResume = () => {
        setResume(false)
        setPause(true)
        run()
        setInter(setInterval(run, 20));
    }

    // click event for reset btn
    const clickReset = () => {
        clearInterval(inter);
        setTimer({ hr: 0, m: 0, s: 0, ms: 0 })
        setIsDisabled(!isDisabled)
        setPause(false)
        setResume(false)
        setStart(true)
    }



    return (
        <div className="">
            <div className="bg-cyan-300 pt-6 pb-4 px-2 mx-20 my-20 rounded-2xl">
                <p className="float-right mr-2">learn react</p>
                
                <div className="bg-white mt-8 p flex justify-center text-4xl">
                    <div >
                        <h1 className="text-center  py-4">React Stopwatch</h1>
                        <p data-testid="time " className=" mt-4 text-center">
                            <span>{timer.hr >= 10 ? timer.hr : " 0" + timer.hr}</span> :  
                            <span>{timer.m >= 10 ?  " "+timer.m : " 0" + timer.m}</span> :  
                            <span>{timer.s >= 10 ? " "+timer.s : " 0" + timer.s}</span>   
                        </p>
                        {start && <button data-testid="start" onClick={clickStart} className="my-4 ml-10 bg-gray-200 px-4 py-2 rounded border-2 border-black hover:bg-white" >Start</button>}
                        {pause && <button data-testid="pause" onClick={clickPause} className="my-4 ml-10 bg-gray-200 px-4 py-2 rounded border-2 border-black hover:bg-white" >Pause</button>}
                        {resume && <button data-testid="resume" onClick={clickResume} className="my-4 ml-10 bg-gray-200 px-4 py-2 rounded border-2 border-black hover:bg-white" >Resume</button>}
                        <button disabled={isDisabled} data-testid="reset" onClick={clickReset} className="my-4 ml-10 bg-gray-200 px-4 py-2 rounded border-2 border-black hover:bg-white" >Reset</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stopwatch;