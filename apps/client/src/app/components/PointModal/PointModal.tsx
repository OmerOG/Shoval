import { CSSProperties } from 'react';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ScreenPosition } from '../../services/map/types';
import { Point } from '@shoval/common';
import './PointModal.less';

interface Props {
    height: number;
    width: number;
    offset: number;
    screenPosition: ScreenPosition;
    point: Point;
}

interface ModalStyle extends CSSProperties {
    '--top': string;
    '--left': string;
    '--height': string;
    '--width': string;
    '--offset': string;
}

export default function PointModal({ height, width, offset, screenPosition, point }: Props) {
    return (
        <div
            className="modal"
            style={
                {
                    '--top': screenPosition.screenY + 'px',
                    '--left': screenPosition.screenX + 'px',
                    '--height': height + 'px',
                    '--width': width + 'px',
                    '--offset': offset + 'px'
                } as ModalStyle
            }
        >
            <h4>{point.description}</h4>
            <span>
                {point.isTOKSynced ? <CloudDoneIcon /> : <CloudUploadIcon />}
                {' | ' + point.timestamp}
            </span>
        </div>
    );
}
