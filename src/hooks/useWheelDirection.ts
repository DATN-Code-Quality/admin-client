import { useEffect, useState } from 'react';

type WHEEL_DIRECTION = 'up' | 'down';

const useWheelDirection = (objId?: string) => {
    const [wheelDir, setWheelDir] = useState<WHEEL_DIRECTION>('down');
    const wheelObj = document.querySelector(objId || 'body');
    const [lastWheelY, setLastWheelY] = useState(0);

    useEffect(() => {
        setLastWheelY(0);
    }, [window.location.pathname]);

    useEffect(() => {
        if (wheelObj !== null) {
            const threshold = 50;
            let ticking = false;

            const updateWheelDir = () => {
                const wheelY = objId ? wheelObj?.scrollTop : window.scrollY;
                if (Math.abs(wheelY - lastWheelY) < threshold) {
                    ticking = false;
                    return;
                }
                setWheelDir(wheelY >= lastWheelY ? 'down' : 'up');
                const updateLastWheelY = wheelY > 0 ? wheelY : 0;
                setLastWheelY(updateLastWheelY);
                ticking = false;
            };

            const onWheel = () => {
                if (!ticking) {
                    window.requestAnimationFrame(updateWheelDir);
                    ticking = true;
                }
            };

            wheelObj.addEventListener('wheel', onWheel);

            return () => wheelObj!.removeEventListener('wheel', onWheel);
        }
    }, [wheelDir, wheelObj, lastWheelY]);

    return wheelDir;
};

export default useWheelDirection;
