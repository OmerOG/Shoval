import { CSSProperties, PropsWithChildren } from 'react';
import { ScreenPosition } from '../../services/map/types';
import './FloatingCard.less';

export type ModalMode = 'edit' | 'view';

export const MODAL_HEIGHT = 120;
export const MODAL_WIDTH = 150;
export const MODAL_OFFSET = 12;

interface Props {
    height?: number;
    width?: number;
    offset?: number;
    screenPosition: ScreenPosition;
}

interface ModalStyle extends CSSProperties {
    '--top': string;
    '--left': string;
    '--height': string;
    '--width': string;
    '--offset': string;
}

export default function FloatingCard({ height, width, offset, screenPosition, children }: PropsWithChildren<Props>) {
    return (
        <div
            className="card"
            style={
                {
                    '--top': screenPosition.screenY + 'px',
                    '--left': screenPosition.screenX + 'px',
                    '--height': (height ?? MODAL_HEIGHT) + 'px',
                    '--width': (width ?? MODAL_WIDTH) + 'px',
                    '--offset': (offset ?? MODAL_OFFSET) + 'px'
                } as ModalStyle
            }
        >
            {children}
        </div>
    );
}
