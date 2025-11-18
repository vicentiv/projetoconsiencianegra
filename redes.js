document.addEventListener('DOMContentLoaded', function () {
  
  const abrirModal = document.getElementById("abrirRedes");
  const modal = document.getElementById("modalRedes");
  const fecharModal = document.getElementById("fecharModal");
  const abrirModal2 = document.getElementById("abrirRedes2");
  const modal2 = document.getElementById("modalRedes2");
  const fecharModal2 = document.getElementById("fecharModal2");
  
  abrirModal.onclick = () => (modal.style.display = "block");
  fecharModal.onclick = () => (modal.style.display = "none");
  window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
  };

  abrirModal2.onclick = () => (modal2.style.display = "block");
  fecharModal2.onclick = () => (modal2.style.display = "none");
  window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
  };
});
