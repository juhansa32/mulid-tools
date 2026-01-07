const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const progressBar = document.getElementById("progressBar");

uploadBtn.addEventListener("click", () => {
  const file = fileInput.files[0];
  if (!file) return alert("파일 선택 먼저!");

  const formData = new FormData();
  formData.append("file", file);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://mulid-tools-server.onrender.com/upload-and-convert");

  // 진행률 표시
  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      const percent = (e.loaded / e.total) * 100;
      progressBar.style.width = percent + "%";
      progressBar.textContent = Math.round(percent) + "%";
    }
  };

  xhr.onload = () => {
    if (xhr.status === 200) {
      const res = JSON.parse(xhr.responseText);
      const link = document.createElement("a");
      link.href = "https://mulid-tools-server.onrender.com/download/" + res.file;
      link.download = res.file;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      progressBar.style.width = "0%";
      progressBar.textContent = "";
      alert("변환 완료! 자동 다운로드 시작");
    } else {
      alert("변환 실패 😢");
    }
  };

  xhr.send(formData);
});
