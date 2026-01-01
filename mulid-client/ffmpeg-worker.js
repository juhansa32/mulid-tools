// Example worker for ffmpeg.wasm offloading (basic pattern)
// This file is a template — integrate with your client to initialize ffmpeg in a worker.
self.importScripts('https://unpkg.com/@ffmpeg/ffmpeg@0.11.6/dist/ffmpeg.min.js');

let ffmpeg = null;

self.onmessage = async (e) => {
  const { type, file, args } = e.data;
  if(type === 'load'){
    const { createFFmpeg } = FFmpeg;
    ffmpeg = createFFmpeg({ log: false });
    await ffmpeg.load();
    postMessage({ type: 'loaded' });
  } else if(type === 'run'){
    if(!ffmpeg) { postMessage({ type:'error', message:'ffmpeg not loaded' }); return; }
    const inName = 'in.bin';
    ffmpeg.FS('writeFile', inName, await fetchFile(file));
    const outName = args.out || 'out.mp4';
    await ffmpeg.run(...args.cmd);
    const data = ffmpeg.FS('readFile', outName);
    postMessage({ type:'done', filename: outName, data: data.buffer }, [data.buffer]);
  }
};

async function fetchFile(file){
  const arr = await file.arrayBuffer();
  return new Uint8Array(arr);
}
