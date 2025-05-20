document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    btnTooltip: document.getElementById('tooltipTrigger'),
    btnTooltipMensaje: document.getElementById('tooltipMsg'),
    closeTooltip: document.getElementById('closeTooltip'),
  };

  if (!elements) return;
  
  setupTooltip(elements);
});

function setupTooltip({ btnTooltip, btnTooltipMensaje, closeTooltip }) {
  const showTooltip = () => {
    btnTooltipMensaje.style.display = 'block';
  }
  const hideTooltip = () => {
    btnTooltipMensaje.style.display = 'none';
  }

  btnTooltip.addEventListener('mouseover', showTooltip);
  btnTooltip.addEventListener('mouseleave', hideTooltip);
  btnTooltip.addEventListener("click", () => {
    btnTooltip.addEventListener("mouseleave", () => {
      btnTooltipMensaje.style.display = "block";
    });
    btnTooltipMensaje.style.display = "block";
  });

  closeTooltip.addEventListener("click", () => {
    btnTooltip.addEventListener("mouseleave", () => {
      btnTooltipMensaje.style.display = "none";
    });
    btnTooltipMensaje.style.display = "none";
  });
}