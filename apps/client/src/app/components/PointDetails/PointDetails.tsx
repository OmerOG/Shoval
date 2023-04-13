import CloudDoneIcon from '@mui/icons-material/CloudDone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Point } from '@shoval/common';
import moment from 'moment';
import './PointDetails.less';

interface Props {
    point: Point;
    handleSubmit?: () => void;
}

export default function PointDetails({ point }: Props) {
    return (
        <>
            <span className="description">{point.description}</span>
            <div className="misc">
                {point.isTOKSynced ? <CloudDoneIcon htmlColor="green" /> : <CloudUploadIcon htmlColor="grey" />}
                {moment(point.timestamp).format('DD/MM/YYYY HH:mm:ss')}
            </div>
        </>
    );
}
