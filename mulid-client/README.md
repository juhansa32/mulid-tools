# MULID — All-in-One Converter

## 로컬 (클라이언트)
- `index.html` 파일을 브라우저로 열면 클라이언트 변환 UI 사용 가능.
- 이미지 변환, ZIP, 텍스트 → PDF 등은 브라우저에서 바로 동작.
- 영상/오디오 변환(FFmpeg)은 클라이언트에서 WASM으로 동작(초기 로드 필요). 대용량은 서버 권장.

## 서버 (Node)
- 서버는 ffmpeg 시스템 바이너리를 사용해 대용량/고성능 변환 처리.
- 설치: `npm install`
- 실행: `node server/index.js`
- 엔드포인트: `POST /upload-and-convert` (form-data: file, optional target)

## Docker
- `docker build -t mulid-server .`
- `docker run -p 3000:3000 mulid-server`

## 배포 참고
- 정적 클라이언트: GitHub Pages / Netlify에 업로드
- 서버: VPS (PM2), Docker, 또는 서버less(제한적) 등
- 보안: 업로드 파일 크기 제한, 인증(API key / OAuth), 파일명/경로 검증 필요
