#resize an image using the PIL image library
# free from:  http://www.pythonware.com/products/pil/index.htm
# tested with Python24        vegaseat     11oct2005
from PIL import Image
# open an image file (.bmp,.jpg,.png,.gif) you have in the working folder
imageFile = "C:/Users/jmtorrente/Desktop/New folder/Brownie.jpg"
im1 = Image.open(imageFile)
# adjust width and height to your needs
width_placehold = 230
width_thumb = 535
width_thumb_2x = 535*2
width_xs = 575
width_sm = 767
width_md = 991
width_lg = 1999
ext = ".jpg"
# use one of these filter options to resize the image
#im2 = im1.resize((width, height), Image.NEAREST)      # use nearest neighbour
#im3 = im1.resize((width, height), Image.BILINEAR)     # linear interpolation in a 2x2 environment
#im4 = im1.resize((width, height), Image.BICUBIC)      # cubic spline interpolation in a 4x4 environment
im1 = im1.resize((width_placehold), Image.ANTIALIAS)    # best down-sizing filter
im1.save("Brownie" + "_placehold" + ext)

im1 = im1.resize((width_thumb), Image.ANTIALIAS)    # best down-sizing filter
im1.save("Brownie" + "_thumb" + ext)

im1 = im1.resize((width_thumb_2x), Image.ANTIALIAS)    # best down-sizing filter
im1.save("Brownie" + "_thumb@2x" + ext)

im1 = im1.resize((width_xs), Image.ANTIALIAS)    # best down-sizing filter
im1.save("Brownie" + "_xs" + ext)

im1 = im1.resize((width_sm), Image.ANTIALIAS)    # best down-sizing filter
im1.save("Brownie" + "_sm" + ext)

im1 = im1.resize((width_md), Image.ANTIALIAS)    # best down-sizing filter
im1.save("Brownie" + "_md" + ext)

im1 = im1.resize((width_lg), Image.ANTIALIAS)    # best down-sizing filter
im1.save("Brownie" + "_lg" + ext)

