from PIL import Image
from resizeimage import resizeimage

imName = "Brownie"

with open('C:/Users/jmtor/Documents/Projects/Web/assets/img/posts/Brownie.jpg', 'r+b') as f:
    with Image.open(f) as image:

        cover = resizeimage.resize_width(image, 230)
        cover.save((imName + "_placehold" + '.jpeg'), image.format)

        cover = resizeimage.resize_width(image, 535)
        cover.save((imName + "_thumb" + '.jpeg'), image.format)

        cover = resizeimage.resize_width(image, 1070)
        cover.save((imName + "_thumb@2x" + '.jpeg'), image.format)

        cover = resizeimage.resize_width(image, 575)
        cover.save((imName + "_xs" + '.jpeg'), image.format)

        cover = resizeimage.resize_width(image, 767)
        cover.save((imName + "_sm" + '.jpeg'), image.format)

        cover = resizeimage.resize_width(image, 991)
        cover.save((imName + "_md" + '.jpeg'), image.format)

        cover = resizeimage.resize_width(image, 1999)
        cover.save((imName + "_lg" + '.jpeg'), image.format)

