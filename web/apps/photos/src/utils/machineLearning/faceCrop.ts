import { Box } from "services/ml/geom";
import { FaceAlignment, FaceCrop, FaceCropConfig } from "services/ml/types";
import { cropWithRotation } from "utils/image";
import { enlargeBox } from ".";

export function getFaceCrop(
    imageBitmap: ImageBitmap,
    alignment: FaceAlignment,
    config: FaceCropConfig,
): FaceCrop {
    const alignmentBox = new Box({
        x: alignment.center.x - alignment.size / 2,
        y: alignment.center.y - alignment.size / 2,
        width: alignment.size,
        height: alignment.size,
    }).round();
    const scaleForPadding = 1 + config.padding * 2;
    const paddedBox = enlargeBox(alignmentBox, scaleForPadding).round();
    const faceImageBitmap = cropWithRotation(imageBitmap, paddedBox, 0, {
        width: config.maxSize,
        height: config.maxSize,
    });

    return {
        image: faceImageBitmap,
        imageBox: paddedBox,
    };
}
