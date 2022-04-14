import React, { useEffect, useState } from 'react';
import "./style.css";



const RangeSlider = ({ setPrice, minValue, maxValue }) => {

    const minGap = 0;

    const [sliderOneValue, setSliderOneValue] = useState(minValue);
    const [sliderTwoValue, setSliderTwoValue] = useState(maxValue);

    const slideOne = () => () => {
        if (sliderTwoValue - sliderOneValue <= minGap) {
            setSliderOneValue(Number.parseInt(sliderTwoValue - minGap));
        }
        fillColor();
    }

    const slideTwo = () => () => {
        if (sliderTwoValue - sliderOneValue <= minGap) {
            setSliderTwoValue(Number.ParseInt(sliderOneValue - minGap));
        }
        fillColor();
    }


    const fillColor = () => {
        let sliderTrack = document.querySelector(".slider-track");
        let percent1 = (sliderOneValue / maxValue) * 100;
        let percent2 = (sliderTwoValue / maxValue) * 100;

        setPrice([sliderOneValue,sliderTwoValue]);

        sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
    }

    const update = ()=>{
        setPrice([sliderOneValue, sliderTwoValue]);
    }
    
    const oneChange = (e) => (e) => {
        setSliderOneValue(Number.parseInt(e.target.value))
    }
    const twoChange = (e) => (e) => {
        setSliderTwoValue(Number.parseInt(e.target.value))
    }
    return (
        <>
            <div className="sliderWrapper">
                <div className="values">
                    <span id="range1">
                        {sliderOneValue}
                    </span>
                    <span> - </span>
                    <span id="range2">
                        {sliderTwoValue}
                    </span>
                </div>
                <div className="sliderContainer">
                    <div className="slider-track"></div>
                    <input type="range" min={minValue} max={maxValue} value={sliderOneValue} className="slider" id="slider-1" onInput={slideOne()} onChange={oneChange()} />
                    <input type="range" min={minValue} max={maxValue} value={sliderTwoValue} className="slider" id="slider-2" onInput={slideTwo()} onChange={twoChange()} />
                </div>
            </div>
        </>
    )
}

RangeSlider.defaultProps = {
    minValue: 0,
    maxValue: 100
}

export default RangeSlider
