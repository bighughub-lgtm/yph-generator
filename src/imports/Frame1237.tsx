import svgPaths from "./svg-wq90a00hzf";
import imgX11 from "figma:asset/162a54401bb002ad0136077ea49133d8245e3a5c.png";

function Frame2() {
  return (
    <div className="absolute left-[129.39px] size-[8.484px] top-[4.24px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.48468 8.48451">
        <g id="Frame 1231">
          <rect fill="var(--fill-0, white)" height="8.48445" rx="4.24223" width="8.48445" />
          <g id="Vector">
            <path d={svgPaths.p4eb5e70} fill="var(--fill-0, #FF0000)" />
            <path d={svgPaths.p4eb5e70} fill="var(--fill-1, #515151)" fillOpacity="0.2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-white border-[#dedede] border-b-[0.399px] border-solid h-[16.969px] left-[-1.7px] top-[0.42px] w-[143.387px]">
      <p className="absolute font-['Open_Sans:Semibold',sans-serif] leading-[normal] left-[calc(50%-33.09px)] not-italic text-[6.39px] text-black top-[calc(50%-4.04px)] whitespace-nowrap">TPU / Gel Phone Case</p>
      <Frame2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-white border-[#4caf50] border-[1.697px] border-solid h-[128.2px] left-[120px] overflow-clip rounded-[3.844px] top-[26px] w-[143.377px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[100.244px] top-[calc(50%+6.39px)]" data-name="x1 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgX11} />
      </div>
      <Frame1 />
    </div>
  );
}

export default function Frame3() {
  return (
    <div className="bg-white relative size-full">
      <div className="-translate-y-1/2 absolute h-[20px] left-[6.9%] right-[86.21%] top-[calc(50%+20.5px)]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g id="Vector">
            <path d={svgPaths.p39edb280} fill="var(--fill-0, #6E6E6E)" />
            <path d={svgPaths.p39edb280} fill="var(--fill-1, #515151)" fillOpacity="0.2" />
          </g>
        </svg>
      </div>
      <div className="-translate-y-1/2 absolute h-[20px] left-[6.9%] right-[86.21%] top-[calc(50%-66.5px)]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g id="Vector">
            <path d={svgPaths.p39edb280} fill="var(--fill-0, #FF0000)" />
            <path d={svgPaths.p39edb280} fill="var(--fill-1, #515151)" fillOpacity="0.2" />
          </g>
        </svg>
      </div>
      <Frame />
      <p className="absolute font-['Open_Sans:Semibold',sans-serif] leading-[normal] left-[20px] not-italic text-[6.39px] text-black top-[9px] whitespace-nowrap">hover</p>
      <p className="absolute font-['Open_Sans:Semibold',sans-serif] leading-[normal] left-[18px] not-italic text-[6.39px] text-black top-[96px] whitespace-nowrap">inactive</p>
    </div>
  );
}