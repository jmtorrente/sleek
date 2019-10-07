################################################################################################
# name: Image_Resize
# desc: Compress image file using python
# date: 2019-02-10
# Author: jmtorrented
################################################################################################
from PIL import Image
from resizeimage import resizeimage

FotoName = 'Brownie.jpg'
Casa = 'C:/Users/jmtor/Documents/Projects/Web/assets/img/posts/'
Work = 'O:/Web/jmtorrente.github.io/assets/img/posts/'
imName = "Brownie"

with open((Work + FotoName), 'r+b') as f:
    with Image.open(f) as image:

        cover = resizeimage.resize_width(image, 230)
        cover.save((imName + "_placehold" + '.jpg'), image.format)

        cover = resizeimage.resize_width(image, 535)
        cover.save((imName + "_thumb" + '.jpg'), image.format)

        cover = resizeimage.resize_width(image, 1070)
        cover.save((imName + "_thumb@2x" + '.jpg'), image.format)

        cover = resizeimage.resize_width(image, 575)
        cover.save((imName + "_xs" + '.jpg'), image.format)

        cover = resizeimage.resize_width(image, 767)
        cover.save((imName + "_sm" + '.jpg'), image.format)

        cover = resizeimage.resize_width(image, 991)
        cover.save((imName + "_md" + '.jpg'), image.format)

        #cover = resizeimage.resize_width(image, 1999)
        #cover.save((imName + "_lg" + '.jpeg'), image.format)

