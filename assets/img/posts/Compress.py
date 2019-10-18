################################################################################################
# name: Image_Compress
# desc: Compress image file using python
# date: 2019-02-10
# Author: jmtorrented
################################################################################################
from PIL import Image, ImageDraw, ImageFont
import os

FotoName = 'Zorki_2'
Casa_Input = 'C:/Users/jmtor/Documents/Projects/Web/assets/img/posts/'
Work_Input = 'O:/Web/jmtorrente.github.io/assets/img/posts/'
Casa_Output = 'C:/Users/jmtor/Documents/Projects/Web/assets/img/posts/'
Work_Output = 'O:/Web/jmtorrente.github.io/assets/img/posts/'
imName = "Zorki_2.jpg" #Change depending on the image name
imName_Res = "Compress"

Im_Input = Casa_Input #Change depending on location
Im_Output = Casa_Output #Change depending on location

print('*** Program Started ***')

im = Image.open(Im_Input + imName)
print('Input file size   : ', im.size )
print('Input file name   : ', imName )
print('Input Image Size  : ', os.path.getsize (Im_Input  + imName))

image_name_output = (imName_Res + imName)

im.save(Im_Output + image_name_output ,optimize=True,quality=50) 

print('Output file size  : ', im.size )
print('Output file name  : ', image_name_output)
print('Output Image Size : ', os.path.getsize (Im_Output + image_name_output))

print('*** Program Ended ***')