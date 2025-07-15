import React, { useEffect, useRef } from 'react'
import AudioMotionAnalyzer from 'audiomotion-analyzer';

interface Props {
    sourceNode?: AudioNode | HTMLMediaElement;
    isStreaming: boolean
}
const Audiomotion: React.FC<Props> = ({ sourceNode, isStreaming}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if(isStreaming && canvasRef.current) {
        const audioMotion = new AudioMotionAnalyzer(canvasRef.current, {
            source: sourceNode,
            canvas: canvasRef.current,
            mode: 8,            // key player
            reflexAlpha: 1,
            reflexRatio: 0.5,
            showPeaks: false,
            roundBars: true,
            lineWidth: 1,
            outlineBars: true,
            showScaleX: false,
            minDecibels: -100,
            gradient: "prism",
            showBgColor: false,
            overlay: true,
            bgAlpha: 0,
            colorMode: "bar-level",
            useCanvas: true,
            connectSpeakers: false
        })
        audioMotion.registerGradient('white', {
            bgColor: "transparent",
            colorStops: [
                { color: "black" }
            ]
        })
        audioMotion.gradient = "white"
    }
  }, [isStreaming, sourceNode])

  return (
    <canvas ref={canvasRef} className="w-[80%] h-[80%] rounded-full px-2" /> 
  )
}

export default Audiomotion;
