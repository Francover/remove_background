import { useState } from 'react';

const Tooltip = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isClicked, setIsClicked] = useState(false);


    const showTooltip = () => setIsVisible(true);

    const hideTooltip = () => {
        if (!isClicked) {
            setIsVisible(false);
        }
    };

    const onClickTooltip = () => {
        setIsClicked(true);
        setIsVisible(true);
    };

    const closeTooltip = () => {
        setIsClicked(false);
        setIsVisible(false);
    };

    return (
        <picture>
            <img
                id="tooltipTrigger"
                src="/src/img/icon-tooltip.svg"
                alt="Tooltip"
                onMouseOver={showTooltip}
                onMouseLeave={hideTooltip}
                onClick={onClickTooltip}
            />
            {isVisible && (
                <p id="tooltipMsg">
                    Formato PNG, tamaño máximo de 5 MB. Asegúrate de que la foto esté tomada de los hombros hacia arriba,
                    buena iluminación y mirando de frente a la cámara.
                    <img
                        id="closeTooltip"
                        src="/src/img/close-btn.png"
                        alt="Cerrar tooltip"
                        onClick={closeTooltip}
                    />
                </p>
            )}
        </picture>
    );
};

export default Tooltip;